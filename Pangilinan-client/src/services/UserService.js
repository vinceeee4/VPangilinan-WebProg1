import API from "./api";

export const fetchUsers = () => API.get("/users");
export const createUser = (user) => API.post("/users", user);
export const registerUser = (user) => API.post("/users/register", user);
export const updateUser = (id, user) => API.put(`/users/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const loginUser = (credentials) => API.post("/users/login", credentials);
export const fetchProfile = () => API.get("/users/me");
