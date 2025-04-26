import User from "../DataBase/Model/Users";
import { UserData } from "./../Interfaces/User";
import PasswordHelper from "../Utility/PasswordHelper";

async function createUser(userData: UserData) {
  try {
    const user = await User.create({
      userName: userData.userName,
      email: userData.email,
      passwordHash: (await PasswordHelper.hashPassword(userData.password)).hash,
      salt: (await PasswordHelper.hashPassword(userData.password)).salt,
      phoneNumber: userData.phoneNumber,
    });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export { createUser };
