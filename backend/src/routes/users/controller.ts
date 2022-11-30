import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "./model/model";
import * as jose from "jose";
import * as argon2 from "argon2";
import { DuplicateResourceError, ValidationError } from "utils/errors";
import { StatusCodes } from "http-status-codes";
import { JWT_SECRET_KEY } from "@constants";
const passwordRegex = RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
);
const TOKEN_COOKIE_NAME = "Token";
export const getUsers = async (_: Request, res: Response) => {
  const users = await UserModel.find();
  return res.json(users);
};
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!passwordRegex.test(req.body.password)) {
      return next(new ValidationError("password is weak"));
    }
    req.body.password = await argon2.hash(req.body.password);
    const createdUser = await UserModel.create(req.body);
    return res.json(createdUser);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(e.message));
    }
    // 11000 means duplicate key
    else if (e.code === 11000) {
      return next(new DuplicateResourceError("hello"));
    }
    return next(e);
  }
};

export async function logout(_: Request, res: Response) {
  res.clearCookie(TOKEN_COOKIE_NAME);
  res.status(StatusCodes.NO_CONTENT).send();
}
export async function login(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send();
  }
  if (await argon2.verify(user.password, password)) {
    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(JWT_SECRET_KEY);
    res.cookie(TOKEN_COOKIE_NAME, jwt, { httpOnly: true, sameSite: "strict" });
    return res.status(StatusCodes.OK).send(user.id);
  }
  return res.status(StatusCodes.UNAUTHORIZED).send();
}
