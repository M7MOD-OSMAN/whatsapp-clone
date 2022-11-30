import { Router } from "express";
import { createUser, getUsers, login, logout } from "./controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.post("/login", login);
userRouter.delete("/logout", logout);
export default userRouter;
