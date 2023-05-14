import { Router } from "express";
import UserModel from "../models/users"
const router = Router();

router.get("/", async (req, res, next) => {
  res.send("Welcome to our app");
});

router.get("/users-admin", async (req, res, next) => {
  const user = await UserModel.find()
  res.send({user});
});

export default router;
