import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  destroyProduct,
} from "../../../controllers/fs/products.controller.js";
import isValidData from "../../../middlewares/isValidData.mid.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:pid", getProduct);
productsRouter.post("/", isValidData, createProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", destroyProduct);

export default productsRouter;
