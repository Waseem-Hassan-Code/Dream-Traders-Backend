import express from "express";
import { registerUser } from "../End-Points/auth-api";

const testFunc = (req: express.Request, res: express.Response) => {
  res.send(200);
};
export default (router: express.Router) => {
  router.post("/auth/register", registerUser);
};
