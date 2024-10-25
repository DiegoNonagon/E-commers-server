import { Router } from "express";
import {
  create,
  destroy,
  readAll,
  paginate,
  read,
  update,
} from "../../../controllers/mongo/products.controller.js";

const productsApiRouter = Router();

productsApiRouter.post("/", create);
productsApiRouter.get("/", readAll);
productsApiRouter.get("/paginate", paginate);
// DECIDIR SI USAMOS READALL O PAGINATE
productsApiRouter.get("/:pid", read);
productsApiRouter.put("/:pid", update);
productsApiRouter.delete("/:pid", destroy);

export default productsApiRouter;
