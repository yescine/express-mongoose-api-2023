import { Router } from "express";
const router = Router();

router.get("/", async (req, res, next) => {
  res.send("Welcome to our app");
});


export default router;
