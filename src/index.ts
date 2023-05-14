import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv' 
import HomeRoute from "./routes/home";
import EcommerceRoute from "./routes/ecommerce";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res, next) => {
  res.status(200);
  res.send("healthy");
});

app.use(express.json())

app.use(HomeRoute);
app.use(EcommerceRoute)

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:password@localhost:27000/admin?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI,{ });
mongoose.connection.once("open", () => {
  console.log("\x1b[36m%s\x1b[0m", "Mongoose connected");
});

app.listen(PORT, async () => {
  console.log("app listening to ", `http://localhost:${PORT}`);
});
