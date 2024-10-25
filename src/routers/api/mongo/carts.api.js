import { Router } from "express";
import {
  create,
  readAll,
  read,
  update,
  destroy,
  calculateTotal,
} from "../../../controllers/mongo/carts.controller.js";

const cartsApiRouter = Router();

cartsApiRouter.post("/", create);
cartsApiRouter.get("/", readAll);
cartsApiRouter.get("/total/:uid", calculateTotal);
cartsApiRouter.get("/:cid", read);
cartsApiRouter.put("/:cid", update);
cartsApiRouter.delete("/:cid", destroy);

export default cartsApiRouter;
