import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT;
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

//cors config
app.use(cors());

//parser config
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES

//DB and server connection
mongoose
  .connect(MONGO_CONNECTION)
  .then(() => app.listen(PORT, () => console.log(`server started at ${PORT}`)))
  .catch((error) => console.log(error));
