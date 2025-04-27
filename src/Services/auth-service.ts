import {
  assignRefreshToken,
  checkIfUserExists,
  User,
} from "../DataBase/Model/Users";
import { UserData } from "../Interfaces/User";
import PasswordHelper from "../Utility/PasswordHelper";
import { generateAccessToken, generateRefreshToken } from "../Utility/jwtToken";

async function _registerUser(userData: UserData) {
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

async function _authenticateUser(email: string, password: string) {
  try {
    const user = await checkIfUserExists(email);
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
        data: null,
        statusCode: 401,
      };
    }

    const isPasswordValid = await PasswordHelper.validatePassword(
      password,
      user.dataValues.passwordHash
    );
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password.",
        statusCode: 401,
      };
    }

    const accessToken = generateAccessToken({
      id: user.dataValues.id,
      email: user.dataValues.email,
    });
    const refreshToken = generateRefreshToken({ id: user.dataValues.id });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const tokenAssignment = await assignRefreshToken(user.dataValues.id, {
      refreshToken,
      expiresAt,
    });

    if (!tokenAssignment) {
      return {
        success: false,
        message: "Error while assigning refresh token.",
        statusCode: 500,
      };
    }

    return {
      success: true,
      data: { user, accessToken, refreshToken },
      statusCode: 200,
      message: "User authenticated successfully.",
    };
  } catch (error: any) {
    console.error("Error while authenticating user:", error);
    return {
      success: false,
      message: error.message || "Error while authenticating the user.",
      statusCode: 500,
    };
  }
}

export { _registerUser, _authenticateUser };
