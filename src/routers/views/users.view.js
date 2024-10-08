import { Router } from "express";
import {
  registerView,
  validateUser,
  loginView,
  dashboardView,
  logout,
} from "../../controllers//fs/users.controller.js";

const usersViewRouter = Router();

usersViewRouter.get("/login", loginView);
usersViewRouter.get("/register", registerView);
usersViewRouter.post("/login", validateUser);
usersViewRouter.get("/dashboard", dashboardView);
usersViewRouter.get("/logout", logout);

export default usersViewRouter;
