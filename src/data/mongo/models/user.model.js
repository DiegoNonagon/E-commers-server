import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
  },
  role: { type: String, enum: [0, 1, 2], default: 0, index: true },
});

schema.plugin(mongoosePaginator);
// le indico al schema que tiene habilitado ademas de todos los metodos de mongoose
// el método paginate() para poder paginar los documentos de la coleccion
const User = model(collection, schema);

export default User;
