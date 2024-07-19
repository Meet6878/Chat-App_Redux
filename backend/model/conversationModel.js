const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const conversationModel = mongoose.model(
  "conversationModel",
  conversationSchema
);
module.exports = conversationModel;
