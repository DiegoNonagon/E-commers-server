import { Router } from "express";
import {
  create,
  destroy,
  read,
  readAll,
  update,
} from "../../../controllers/mongo/users.controller.js";

const usersApiRouter = Router();

usersApiRouter.post("/", create);
usersApiRouter.get("/", readAll);
usersApiRouter.get("/:uid", read);
usersApiRouter.put("/:uid", update);
usersApiRouter.delete("/:uid", destroy);

export default usersApiRouter;
