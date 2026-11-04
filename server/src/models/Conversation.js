import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String, trim: true },
    groupImage: { type: String, default: "" },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });

export default mongoose.model("Conversation", conversationSchema);
