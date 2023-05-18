import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv' 
import HomeRoute from "./routes/home";
import {Request, Response} from 'express'
import path from "path"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res, next) => {
  res.status(200);
  res.send("healthy");
});

// production mode
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build')); // serve federation in PROD

  // return Shell App
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(HomeRoute);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:password@localhost:27000/admin?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI,{ });
mongoose.connection.once("open", () => {
  console.log("\x1b[36m%s\x1b[0m", "Mongoose connected");
});

app.listen(PORT, async () => {
  console.log("app listening to ", `http://localhost:${PORT}`);
});
