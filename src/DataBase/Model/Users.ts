import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../DbContext"; // Sequelize instance

// Define the User model using sequelize.define
const User = sequelize.define(
  "User", // Model name
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userRole: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

async function checkIfUserExists(email: string) {
  const existingUser = await User.findOne({
    where: { email },
    attributes: [
      "id",
      "userName",
      "email",
      "phoneNumber",
      "passwordHash",
      "salt",
      "userRole",
    ],
  });
  return existingUser;
}

async function assignRefreshToken(
  id: string,
  newUserData: { refreshToken?: string; expiresAt?: Date }
) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await user.update(newUserData);

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function createUser(userData: {
  userName: string;
  email: string;
  passwordHash: string;
  salt: string;
  phoneNumber?: string;
}) {
  const user = await User.create(userData);
  return user;
}

async function seedSuperAdmin() {
  const existingAdmin = await checkIfUserExists("admin@example.com");

  if (!existingAdmin) {
    await createUser({
      userName: "Super Admin",
      email: "admin@example.com",
      phoneNumber: "1234567890",
      passwordHash: "yourHashedPasswordHere",
      salt: "randomSaltHere",
    });

    console.log("✅ Super Admin seeded successfully.");
  } else {
    console.log("ℹ️ Super Admin already exists.");
  }
}

export {
  User,
  createUser,
  checkIfUserExists,
  seedSuperAdmin,
  assignRefreshToken,
};
