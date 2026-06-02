require("dotenv").config();

const mongoose = require("mongoose");
const app = require("../app");

const stamp = Date.now();
const created = {
  articleId: null,
  editorId: null,
  userId: null,
};

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const expect = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const auth = (token) => ({ Authorization: `Bearer ${token}` });

const run = async () => {
  await app.connectPromise;

  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  const port = server.address().port;
  const base = `http://127.0.0.1:${port}/api`;
  const request = (path, options = {}) =>
    fetch(`${base}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

  let adminToken;
  let editorToken;

  try {
    const adminLogin = await request("/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
        password: process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!",
      }),
    });
    const adminData = await readJson(adminLogin);
    expect(adminLogin.status === 200, "Admin login should succeed");
    expect(adminData.user?.type === "admin", "Admin login should return admin role");
    expect(Boolean(adminData.token), "Admin login should return a JWT");
    adminToken = adminData.token;

    const signupPayload = {
      firstName: "Viewer",
      lastName: "Test",
      age: "22",
      gender: "other",
      contactNumber: "09123456789",
      email: `viewer${stamp}@example.com`,
      username: `viewer${stamp}`,
      password: "Viewer123!",
      address: "Test Address",
    };
    const signup = await request("/users/register", {
      method: "POST",
      body: JSON.stringify(signupPayload),
    });
    const signupData = await readJson(signup);
    expect(signup.status === 201, "Viewer signup should create a MongoDB user");
    expect(signupData.user?.type === "user", "Public signup should create user role");
    expect(!signupData.token, "Viewer signup should not return a JWT");
    created.userId = signupData.user?._id;

    const viewerLogin = await request("/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: signupPayload.email,
        password: signupPayload.password,
      }),
    });
    const viewerLoginData = await readJson(viewerLogin);
    expect(viewerLogin.status === 403, "Viewer login should be blocked");
    expect(
      viewerLoginData.message === "Viewers are not allowed to log in.",
      "Viewer login should return a clear message",
    );

    const adminUsers = await request("/users", { headers: auth(adminToken) });
    expect(adminUsers.status === 200, "Admin should access Users API");

    const editorPayload = {
      firstName: "Editor",
      lastName: "Test",
      age: "23",
      gender: "other",
      contactNumber: "09123456780",
      email: `editor${stamp}@example.com`,
      username: `editor${stamp}`,
      password: "Editor123!",
      address: "Test Address",
      type: "editor",
    };
    const createEditor = await request("/users", {
      method: "POST",
      headers: auth(adminToken),
      body: JSON.stringify(editorPayload),
    });
    const editorData = await readJson(createEditor);
    expect(createEditor.status === 201, "Admin should create editor");
    expect(editorData.type === "editor", "Created account should be editor");
    created.editorId = editorData._id;

    const editorLogin = await request("/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: editorPayload.email,
        password: editorPayload.password,
      }),
    });
    const editorLoginData = await readJson(editorLogin);
    expect(editorLogin.status === 200, "Editor login should succeed");
    expect(Boolean(editorLoginData.token), "Editor login should return a JWT");
    editorToken = editorLoginData.token;

    const editorUsers = await request("/users", { headers: auth(editorToken) });
    expect(editorUsers.status === 403, "Editor should not access Users API");

    const articlePayload = {
      name: `lab-act-7-smoke-${stamp}`,
      title: "Lab Act 7 Smoke Article",
      imageUrl: "/assets/test.jpg",
      content: ["Preview paragraph", "Body paragraph"],
      isActive: true,
    };
    const createArticle = await request("/articles", {
      method: "POST",
      headers: auth(editorToken),
      body: JSON.stringify(articlePayload),
    });
    const articleData = await readJson(createArticle);
    expect(createArticle.status === 201, "Editor should create article");
    created.articleId = articleData._id;

    const publicActive = await request("/articles", {
      headers: { Origin: "http://localhost:5174" },
    });
    const publicActiveData = await readJson(publicActive);
    expect(publicActive.status === 200, "Public articles should load");
    expect(
      publicActive.headers.get("access-control-allow-origin") === "http://localhost:5174",
      "CORS should allow localhost:5174",
    );
    expect(
      publicActiveData.articles.some((article) => article._id === created.articleId),
      "Published article should appear publicly",
    );

    const editArticle = await request(`/articles/${created.articleId}`, {
      method: "PUT",
      headers: auth(editorToken),
      body: JSON.stringify({ title: "Updated by Editor" }),
    });
    const editedData = await readJson(editArticle);
    expect(editArticle.status === 200, "Editor should edit article");
    expect(editedData.title === "Updated by Editor", "Article title should update");

    const disableArticle = await request(`/articles/${created.articleId}`, {
      method: "PUT",
      headers: auth(editorToken),
      body: JSON.stringify({ isActive: false }),
    });
    expect(disableArticle.status === 200, "Editor should disable article");

    const publicDisabled = await request("/articles");
    const publicDisabledData = await readJson(publicDisabled);
    expect(
      !publicDisabledData.articles.some((article) => article._id === created.articleId),
      "Disabled article should disappear publicly",
    );

    const dashboardArticles = await request("/articles", {
      headers: auth(editorToken),
    });
    const dashboardData = await readJson(dashboardArticles);
    expect(
      dashboardData.articles.some((article) => article._id === created.articleId),
      "Editor dashboard should include disabled article",
    );

    const enableArticle = await request(`/articles/${created.articleId}`, {
      method: "PUT",
      headers: auth(editorToken),
      body: JSON.stringify({ isActive: true }),
    });
    expect(enableArticle.status === 200, "Editor should enable article");

    const publicEnabled = await request("/articles");
    const publicEnabledData = await readJson(publicEnabled);
    expect(
      publicEnabledData.articles.some((article) => article._id === created.articleId),
      "Enabled article should reappear publicly",
    );

    const editorDelete = await request(`/articles/${created.articleId}`, {
      method: "DELETE",
      headers: auth(editorToken),
    });
    expect(editorDelete.status === 403, "Editor should not delete articles");

    const adminDelete = await request(`/articles/${created.articleId}`, {
      method: "DELETE",
      headers: auth(adminToken),
    });
    expect(adminDelete.status === 200, "Admin should delete article");
    created.articleId = null;

    console.log("Lab Act 7 API smoke test passed");
  } finally {
    if (adminToken && created.articleId) {
      await request(`/articles/${created.articleId}`, {
        method: "DELETE",
        headers: auth(adminToken),
      });
    }

    if (adminToken && created.editorId) {
      await request(`/users/${created.editorId}`, {
        method: "DELETE",
        headers: auth(adminToken),
      });
    }

    if (adminToken && created.userId) {
      await request(`/users/${created.userId}`, {
        method: "DELETE",
        headers: auth(adminToken),
      });
    }

    await new Promise((resolve) => server.close(resolve));
    await mongoose.connection.close();
  }
};

run().catch((error) => {
  console.error("API flow test failed");
  console.error(error.message);
  process.exitCode = 1;
});
