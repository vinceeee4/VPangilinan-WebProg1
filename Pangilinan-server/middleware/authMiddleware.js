const jwt = require("jsonwebtoken");
const User = require("../models/User");

const normalizeRole = (role) => (role === "viewer" ? "user" : role);

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = {
      ...user.toObject(),
      type: normalizeRole(user.type),
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (user && user.isActive) {
      req.user = {
        ...user.toObject(),
        type: normalizeRole(user.type),
      };
    }

    next();
  } catch (error) {
    next();
  }
};

const authorize = (...roles) => (req, res, next) => {
  const userRole = normalizeRole(req.user?.type);

  if (!userRole || !roles.includes(userRole)) {
    return res.status(403).json({ message: "Forbidden for this role" });
  }

  next();
};

module.exports = { protect, optionalAuth, authorize };
