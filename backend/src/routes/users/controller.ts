import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "./model/model";
import * as argon2 from "argon2";
import { DuplicateResourceError, ValidationError } from "utils/errors";
const passwordRegex = RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
);
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
