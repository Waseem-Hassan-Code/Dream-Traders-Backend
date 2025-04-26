import express from "express";
import userSchema from "./../Validator/ValidateNewUser";
import { UserData } from "./../Interfaces/User";
import { createUser } from "../Services/auth-service";

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      res.status(400).json({ success: false, message: error.details });
    }

    const userData: UserData = value;
    const result = await createUser(userData);

    if (result.success) {
      res.status(result.statusCode).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } else {
      res
        .status(result.statusCode)
        .json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).send("Error while processing the request.");
  }
};
