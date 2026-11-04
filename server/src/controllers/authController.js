import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

const publicUser = (u) => ({
  _id: u._id,
  name: u.name,
  email: u.email,
  profileImage: u.profileImage,
  isOnline: u.isOnline,
  lastSeen: u.lastSeen,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email || !password)
    return res.status(400).json({ message: "Name, email and password are required." });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
  if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: "An account with this email already exists." });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ token: signToken(user._id), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  const ok = user && (await bcrypt.compare(password, user.password));
  if (!ok) return res.status(401).json({ message: "Email or password is incorrect." });

  res.json({ token: signToken(user._id), user: publicUser(user) });
}

export async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function logout(req, res) {
  // JWTs are stateless: the client discards the token. Presence is also handled by the socket layer (Day 5).
  await User.findByIdAndUpdate(req.user._id, { isOnline: false, lastSeen: new Date() });
  res.json({ message: "Signed out." });
}

export async function updateProfile(req, res) {
  const { name, profileImage } = req.body;
  if (name !== undefined) req.user.name = name.trim() || req.user.name;
  if (profileImage !== undefined) req.user.profileImage = profileImage;
  await req.user.save();
  res.json({ user: publicUser(req.user) });
}
