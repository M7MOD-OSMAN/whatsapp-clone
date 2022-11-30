import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jose from "jose";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import * as cookie from "cookie";
import { JWT_SECRET_KEY } from "@constants";

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies["Token"];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send();
  } else {
    try {
      await jose.jwtVerify(token, JWT_SECRET_KEY);
      return next();
    } catch (e) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
  }
}
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.path.includes("login") ||
    (req.path === "/users" && req.method === "POST")
  ) {
    return next();
  } else {
    await verifyToken(req, res, next);
  }
}
const authError = new Error("auth_error");
export async function authSocketioMiddleware(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  if (!socket.request.headers.cookie) {
    next(authError);
    return;
  }
  const cookies = cookie.parse(socket.request.headers.cookie);
  const token = cookies["Token"];
  if (!token) {
    next(authError);
  } else {
    try {
      await jose.jwtVerify(token, JWT_SECRET_KEY);
      return next();
    } catch (e) {
      return next(authError);
    }
  }
}
