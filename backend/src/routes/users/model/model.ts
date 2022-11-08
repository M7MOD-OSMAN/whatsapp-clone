import * as mongoose from "mongoose";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}
const schema = new mongoose.Schema<User>({
  name: String,
  email: String,
  password: String,
});
const UserModel = mongoose.model("User", schema);
export default UserModel;
