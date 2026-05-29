const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const normalizeRole = (role) => (role === "viewer" ? "user" : role);

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  obj.type = normalizeRole(obj.type);
  return obj;
};

const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, type: normalizeRole(user.type) },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

const normalizeUserPayload = (data) => {
  const payload = { ...data };

  if (!payload.contactNumber && payload.contact) {
    payload.contactNumber = payload.contact;
  }

  delete payload.contact;
  return payload;
};

const createUserForRegistration = async (data, options = {}) => {
  const payload = normalizeUserPayload(data);
  const { password, email, username } = data;

  if (!password) {
    const error = new Error("Password is required");
    error.statusCode = 400;
    throw error;
  }

  const exists = await User.findOne({
    $or: [
      { email: String(email || "").toLowerCase() },
      { username: String(username || "").toLowerCase() },
    ],
  });

  if (exists) {
    const error = new Error("Email or username already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({
    ...payload,
    type: options.allowRoleSelection ? normalizeRole(payload.type) || "user" : "user",
    password: hashedPassword,
  });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  res.json(users.map(sanitizeUser));
};

const createUser = async (req, res) => {
  const user = await createUserForRegistration(req.body, {
    allowRoleSelection: true,
  });
  res.status(201).json(sanitizeUser(user));
};

const registerUser = async (req, res) => {
  const user = await createUserForRegistration(req.body);
  const token = signToken(user);

  res.status(201).json({
    message: "Registration successful",
    token,
    user: sanitizeUser(user),
  });
};

const updateUser = async (req, res) => {
  const updates = { ...req.body };

  if (updates.type) {
    updates.type = normalizeRole(updates.type);
  }

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  } else {
    delete updates.password;
  }

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User permanently deleted", user: sanitizeUser(user) });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email || "").toLowerCase() });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.isActive) {
    return res.status(403).json({
      message: "Your account is inactive. Please contact administrator.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password || "", user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    token: signToken(user),
    user: sanitizeUser(user),
  });
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  getUsers,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
};
