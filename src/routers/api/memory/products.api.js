import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  destroyProduct,
} from "../../../controllers/memory/products.controller.js";
import isValidData from "../../../middlewares/isValidData.mid.js";

const productsRouterMemory = Router();

productsRouterMemory.get("/", getAllProducts);
productsRouterMemory.get("/:pid", getProduct);
productsRouterMemory.post("/", isValidData, createProduct);
productsRouterMemory.put("/:pid", updateProduct);
productsRouterMemory.delete("/:pid", destroyProduct);

export default productsRouterMemory;
