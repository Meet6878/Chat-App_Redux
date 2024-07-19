const express = require("express");
const {
  sendMessageController,
  getMessageController,
} = require("../controller/messageController");
const Protected = require("../middleware/AuthMiddleware");

const messageRoute = express.Router();

messageRoute.post("/send/:id", Protected, sendMessageController);
messageRoute.get("/getmessage/:id", Protected, getMessageController);

module.exports = messageRoute;
