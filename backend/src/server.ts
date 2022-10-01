import express from "express";
import http from "http";
import { authMiddleware, login } from "@middlewares/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}
app.use(cookieParser()).use(express.json()).use(authMiddleware);
app.post("/login", login);
http.createServer(app).listen(8000, () => console.log("Listening on 8000"));
