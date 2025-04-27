import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
    app.get("/login", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
    app.get("/signup", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
    app.get("/profile", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
    app.get("/settings", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  } else {
    console.warn(
      "Frontend build directory not found. Ensure the frontend is built and placed in the 'frontend/dist' folder."
    );
  }
}

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is running on port: " + PORT);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to MongoDB:", err.message);
  });
