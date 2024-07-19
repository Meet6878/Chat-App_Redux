// index.js (or your main file)

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // { userId => socketId } // store online users

io.on("connection", (socket) => {
  console.log("Connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id; // store user as online
    console.log("User connected:", userId);
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send online users to frontend
  }

  socket.on("disconnect", () => {
    console.log("Disconnected", socket.id);
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId]; // remove user from online list
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // update online users
    }
  });
});

// Function to get receiver's socket ID based on receiver ID

// Exporting app, io, server, and getReceiverSocketId
module.exports = { app, io, server, getReceiverSocketId };
