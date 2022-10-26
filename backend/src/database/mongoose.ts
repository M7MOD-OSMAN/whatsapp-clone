import mongoose from "mongoose";

export default function initDatabase() {
  return mongoose.connect(process.env.MONGODB_URL, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DBNAME,
  });
}
