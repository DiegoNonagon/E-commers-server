import { Router } from "express";
import productsRouter from "./fs/products.api.js";
import userRouter from "./fs/users.api.js";
import userRouterMemory from "./memory/users.api.js";
import productsRouterMemory from "./memory/products.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter, productsRouterMemory);
apiRouter.use("/users", userRouter, userRouterMemory);

export default apiRouter;
