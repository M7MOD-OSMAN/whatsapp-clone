import { Request, Response } from "express";
import UserModel from "./model/model";

export const getUsers = async (_: Request, res: Response) => {
  const users = await UserModel.find();
  return res.json(users);
};
