import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; // Get the socket id of the receiver
}

const userSocketMap = {}; // Store online users

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  const userId = socket.handshake.query.userId; // Get userId from query params
  if (userId) {
    userSocketMap[userId] = socket.id; // Map userId to socket id
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit online users to all clients

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete userSocketMap[userId]; // Remove user from online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users to all clients
  });
});

export { io, app, server };
