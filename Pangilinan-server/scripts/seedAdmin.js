require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  await connectDB();

  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  const exists = await User.findOne({
    $or: [
      { email: email.toLowerCase() },
      { username: username.toLowerCase() },
    ],
  });

  if (exists) {
    console.log("Admin user already exists. No changes made.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    firstName: process.env.SEED_ADMIN_FIRST_NAME || "Admin",
    lastName: process.env.SEED_ADMIN_LAST_NAME || "User",
    age: process.env.SEED_ADMIN_AGE || "21",
    gender: process.env.SEED_ADMIN_GENDER || "other",
    contactNumber: process.env.SEED_ADMIN_CONTACT || "09123456789",
    email,
    username,
    password: hashedPassword,
    address: process.env.SEED_ADMIN_ADDRESS || "Not set",
    type: "admin",
    isActive: true,
  });

  console.log("Admin user created successfully.");
};

seedAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    const mongoose = require("mongoose");
    await mongoose.connection.close();
  });
