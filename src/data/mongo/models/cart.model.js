import { Schema, Types, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

// cada producto que el usuario agrega al carrito
// genera un documento cart
// con los datos del producto, los datos del usuario, la cantidad que compró, el precio y el estado del producto (reservado, pagado, enviado)
const collection = "carts";
const schema = new Schema({
  product_id: { type: Types.ObjectId, ref: "products", required: true },
  user_id: { type: Types.ObjectId, ref: "users", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  state: {
    type: String,
    default: "reserved",
    enum: ["reserved", "paid", "delivered"],
  },
});

// solo carts necesita poblar/transformar el objectid en datos
//lo haremos con el middleware de mongoose PRE
schema.pre(
  //metodo a popular
  "find",
  //callback (TRADICIONAL!!! no puede ser flecha) con las condiciones de populacion
  function () {
    this.populate("user_id", "email -_id");
    this.populate("product_id", "title photo category");
  }
);
schema.pre("findOne", function () {
  this.populate("user_id", "email -_id");
  this.populate("product_id", "title photo category");
});
schema.pre("findOneAndUpdate", function () {
  this.populate("user_id", "email -_id");
  this.populate("product_id", "title photo category");
});
schema.pre("findOneAndDelete", function () {
  this.populate("user_id", "email -_id");
  this.populate("product_id", "title photo category");
});
schema.plugin(mongoosePaginator);
// le indico al schema que tiene habilitado ademas de todos los metodos de mongoose
// el método paginate() para poder paginar los documentos de la coleccion
const Cart = model(collection, schema);
export default Cart;
