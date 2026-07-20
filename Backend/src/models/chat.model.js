import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      category: {
        type: String,
        default: "general",
      },
      tags: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ user: 1, lastMessageAt: -1 });

const chatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default chatModel;
