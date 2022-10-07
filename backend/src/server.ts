import express, { Request } from "express";
import http from "http";
import {
  authMiddleware,
  authSocketioMiddleware,
  login,
} from "@middlewares/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { Message, messageEvent } from "events/message";
import connectRedis from "database/redis";
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
io.use(authSocketioMiddleware);
connectRedis().then((redisClient) => {
  io.on("connection", async (socket) => {
    await redisClient.set(socket.handshake.query.email as string, socket.id);
    socket.on(messageEvent, async (message: Message) => {
      io.to(await redisClient.get(message.receiverEmail)).emit(
        messageEvent,
        message
      );
    });
  });
  server.listen(8000, () => console.log("Listening on 8000"));
});
