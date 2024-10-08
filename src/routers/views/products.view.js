import { Router } from "express";
import {
  showOneProduct,
  showProducts,
  createProduct,
  createProductView,
} from "../../controllers/fs/products.controller.js";

const productsViewRouter = Router();

// Ruta para mostrar el formulario de creación de productos
productsViewRouter.get("/create", createProductView);

// Ruta para crear un nuevo producto
productsViewRouter.post("/create", createProduct);
productsViewRouter.get("/", showProducts);
productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;
