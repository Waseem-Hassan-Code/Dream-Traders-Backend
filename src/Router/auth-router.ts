import express from "express";
import { authenticateUser, registerUser } from "../End-Points/auth-api";

export default (router: express.Router) => {
  router.post("/auth/register", registerUser);
  router.post("/auth/authenticate", authenticateUser);
};
