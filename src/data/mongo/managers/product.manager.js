import Product from "../models/product.model.js";
import MongoManager from "./manager.mongo.js";

const productsMongoManager = new MongoManager(Product);
export default productsMongoManager;
