import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  destroyUser,
} from "../../../controllers/memory/users.controller.js";
import isValidUserData from "../../../middlewares/isValidUserData.js";

const userRouterMemory = Router();

userRouterMemory.get("/", getAllUsers);
userRouterMemory.get("/:uid", getUser);
userRouterMemory.post("/", isValidUserData, createUser);
userRouterMemory.put("/:uid", updateUser);
userRouterMemory.delete("/:uid", destroyUser);

export default userRouterMemory;
