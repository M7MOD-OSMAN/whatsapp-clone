import { Router } from "express";
import { createUser, getUsers } from "./controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
export default userRouter;
