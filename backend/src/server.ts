import express from "express";
import http from "http";
import { authMiddleware, login } from "@middlewares/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
require("dotenv").config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}
app.use(cookieParser()).use(express.json()).use(authMiddleware);
app.post("/login", login);
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});
io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});
server.listen(8000, () => console.log("Listening on 8000"));
