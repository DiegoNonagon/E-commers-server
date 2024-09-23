import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  destroyUser,
} from "../../controllers/users.controller.js";
import isValidUserData from "../../middlewares/isValidUserData.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:uid", getUser);
userRouter.post("/", isValidUserData, createUser);
userRouter.put("/:uid", updateUser);
userRouter.delete("/:uid", destroyUser);

export default userRouter;
