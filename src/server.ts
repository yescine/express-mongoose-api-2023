import express from "express";
import * as dotenv from 'dotenv' 
import HomeRoute from "./routes/home";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 2800;

app.get("/health", (req, res, next) => {
  res.status(200);
  res.send("healthy");
});

app.use(HomeRoute);

app.listen(PORT, async () => {
  console.log("app listening to ", `http://localhost:${PORT}`);
});
