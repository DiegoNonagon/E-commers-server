import { Router } from "express";
import {
  showOneProduct,
  showProducts,
} from "../../controllers/fs/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showProducts);
productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;
