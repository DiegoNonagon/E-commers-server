import Cart from "../models/cart.model.js";
import MongoManager from "./manager.mongo.js";

const cartsMongoManager = new MongoManager(Cart);
export default cartsMongoManager;
