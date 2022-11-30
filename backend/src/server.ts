import express from "express";
import http2Express from "http2-express-bridge";
import http2 from "http2";
import fs from "fs";
import { authMiddleware, authSocketioMiddleware } from "@middlewares/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { Message, messageEvent } from "events/message";
import connectRedis from "database/redis";
import initDatabase from "database/mongoose";
import router from "router";
import { errorHandler } from "@middlewares/errorHandler";
import helmet from "helmet";
import path from "path";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const app = http2Express(express);
app.use(helmet({}));
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}
app.use(cookieParser()).use(express.json()).use(authMiddleware);
app.use(router);
app.use(errorHandler);
const rootFolder = path.resolve(__dirname, "../");
const server = http2.createSecureServer(
  {
    key: fs.readFileSync(path.join(rootFolder, "key.pem")),
    cert: fs.readFileSync(path.join(rootFolder, "cert.pem")),
  },
  app
);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});
io.use(authSocketioMiddleware);
async function init() {
  await initDatabase();
  const redisClient = await connectRedis();
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
}
init();
