import { Router } from "express";
import productsRouter from "./products.api.js";
import userRouter from "./users.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
