import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jose from "jose";
import { TextEncoder } from "util";
const encoder = new TextEncoder();
const JWT_SECRET_KEY = encoder.encode(process.env["JWT_SECRET_KEY"]);
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
  if (req.url.includes("login")) {
    return next();
  } else {
    await verifyToken(req, res, next);
  }
}

export async function login(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "mohamad@hotmail.com" && password === "123456") {
    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(JWT_SECRET_KEY);
    res.cookie("Token", jwt, { httpOnly: true, sameSite: "strict" });
    return res.status(StatusCodes.OK).send();
  }
  return res.status(StatusCodes.UNAUTHORIZED).send();
}
