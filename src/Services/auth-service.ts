import { User } from "../DataBase/Model/Users";
import { UserData } from "../Interfaces/User";
import PasswordHelper from "../Utility/PasswordHelper";
import ServiceResponse from "../Interfaces/ServiceResponse";

async function createUser(userData: UserData) {
  try {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      return {
        success: false,
        message: "Email is already in use.",
        data: null,
        statusCode: 400,
      };
    }

    const { hash, salt } = await PasswordHelper.hashPassword(userData.password);

    const user = await User.create({
      userName: userData.userName,
      email: userData.email,
      passwordHash: hash,
      salt,
      phoneNumber: userData.phoneNumber,
    });

    return {
      success: true,
      data: user,
      statusCode: 201,
      message: "User created successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error while creating the user.",
      statusCode: 500,
    };
  }
}

export { createUser };
