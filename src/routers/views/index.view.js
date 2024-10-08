import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsViewRouter);
//viewsRouter.use("/carts", cartsViewRouter);
viewsRouter.use("/users", usersViewRouter);

viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index");
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;
