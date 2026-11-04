import User from "../models/User.js";

// GET /api/users?search=term  -> registered users except me
export async function searchUsers(req, res) {
  const q = (req.query.search || "").toString().trim();
  const filter = { _id: { $ne: req.user._id } };
  if (q) {
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ name: new RegExp(safe, "i") }, { email: new RegExp(safe, "i") }];
  }
  const users = await User.find(filter).select("name email profileImage isOnline lastSeen").limit(20);
  res.json({ users });
}
