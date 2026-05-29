require("dotenv").config();

const base = `http://localhost:${process.env.PORT || 8000}/api`;
const stamp = Date.now();

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const request = (path, options = {}) =>
  fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

const auth = (token) => ({ Authorization: `Bearer ${token}` });

const run = async () => {
  const result = {};
  let adminToken;
  let userToken;
  let editorToken;
  let articleId;
  let userId;
  let editorId;

  const adminLogin = await request("/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
      password: process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!",
    }),
  });
  const adminData = await readJson(adminLogin);
  adminToken = adminData.token;
  result.adminLoginStatus = adminLogin.status;
  result.adminTokenSaved = Boolean(adminToken);
  result.adminRole = adminData.user?.type || null;

  const signupPayload = {
    firstName: "User",
    lastName: "Test",
    age: "22",
    gender: "other",
    contactNumber: "09123456789",
    email: `user${stamp}@example.com`,
    username: `user${stamp}`,
    password: "User123!",
    address: "Test Address",
    type: "admin",
  };
  const signup = await request("/users/register", {
    method: "POST",
    body: JSON.stringify(signupPayload),
  });
  const signupData = await readJson(signup);
  userToken = signupData.token;
  userId = signupData.user?._id;
  result.signupStatus = signup.status;
  result.signupRole = signupData.user?.type || null;
  result.userTokenSaved = Boolean(userToken);

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
  editorId = editorData._id;
  result.adminCreateEditorStatus = createEditor.status;
  result.createdEditorRole = editorData.type || null;

  const editorLogin = await request("/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: editorPayload.email,
      password: editorPayload.password,
    }),
  });
  const editorLoginData = await readJson(editorLogin);
  editorToken = editorLoginData.token;
  result.editorLoginStatus = editorLogin.status;
  result.editorTokenSaved = Boolean(editorToken);

  const noTokenArticles = await request("/articles");
  result.noTokenArticlesStatus = noTokenArticles.status;

  const userUsers = await request("/users", { headers: auth(userToken) });
  result.userUsersStatus = userUsers.status;

  const articlePayload = {
    name: `test-article-${stamp}`,
    title: "Test Article",
    imageUrl: "/assets/test.jpg",
    content: ["Initial content"],
    isActive: true,
  };
  const adminCreateArticle = await request("/articles", {
    method: "POST",
    headers: auth(adminToken),
    body: JSON.stringify(articlePayload),
  });
  const articleData = await readJson(adminCreateArticle);
  articleId = articleData._id;
  result.adminCreateArticleStatus = adminCreateArticle.status;

  const userCreateArticle = await request("/articles", {
    method: "POST",
    headers: auth(userToken),
    body: JSON.stringify({
      ...articlePayload,
      name: `user-create-${stamp}`,
    }),
  });
  result.userCreateArticleStatus = userCreateArticle.status;

  const editorUpdateArticle = await request(`/articles/${articleId}`, {
    method: "PUT",
    headers: auth(editorToken),
    body: JSON.stringify({ title: "Updated by Editor" }),
  });
  result.editorUpdateArticleStatus = editorUpdateArticle.status;

  const userReadArticles = await request("/articles", {
    headers: auth(userToken),
  });
  const userReadData = await readJson(userReadArticles);
  result.userReadArticlesStatus = userReadArticles.status;
  result.userReadArticlesArray = Array.isArray(userReadData.articles);

  const adminDeleteArticle = await request(`/articles/${articleId}`, {
    method: "DELETE",
    headers: auth(adminToken),
  });
  result.adminDeleteArticleStatus = adminDeleteArticle.status;

  if (editorId) {
    const cleanupEditor = await request(`/users/${editorId}`, {
      method: "DELETE",
      headers: auth(adminToken),
    });
    result.cleanupEditorStatus = cleanupEditor.status;
  }

  if (userId) {
    const cleanupUser = await request(`/users/${userId}`, {
      method: "DELETE",
      headers: auth(adminToken),
    });
    result.cleanupUserStatus = cleanupUser.status;
  }

  console.log(JSON.stringify(result, null, 2));
};

run().catch((error) => {
  console.log("API flow test failed");
  console.log("Error name:", error.name);
  console.log("Error message:", error.message);
  process.exitCode = 1;
});
