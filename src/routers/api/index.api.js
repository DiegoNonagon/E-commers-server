import { Router } from "express";
import productsRouter from "./fs/products.api.js";
import userRouter from "./fs/users.api.js";
import userRouterMemory from "./memory/users.api.js";
import productsRouterMemory from "./memory/products.api.js";
import usersApiRouter from "./mongo/users.api.js";
import productsApiRouter from "./mongo/products.api.js";
import cartsApiRouter from "./mongo/carts.api.js";

const apiRouter = Router();

apiRouter.use(
  "/products",
  productsApiRouter,
  productsRouter,
  productsRouterMemory
);
apiRouter.use("/users", usersApiRouter, userRouter, userRouterMemory);
apiRouter.use("/carts", cartsApiRouter);

export default apiRouter;
