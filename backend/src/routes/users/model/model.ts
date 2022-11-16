import * as mongoose from "mongoose";
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}
const nameRegex = "^[A-Za-z0-9]{3,16}$";
const schema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
      match: RegExp(nameRegex),
    },
    email: {
      type: String,
      required: true,
      match: RegExp(emailRegex),
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
const UserModel = mongoose.model("User", schema);
export default UserModel;
