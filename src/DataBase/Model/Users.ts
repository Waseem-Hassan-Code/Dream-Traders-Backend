import sequelize from "../DbContext";
import { DataTypes, Model } from "sequelize";

interface UserAttributes {
  id?: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  passwordHash?: string;
  salt?: string;
  userRole?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  refreshToken?: string;
  expiresAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public userName!: string;
  public email!: string;
  public phoneNumber!: string;
  public passwordHash!: string;
  public salt!: string;
  public refreshToken!: string;
  public expiresAt!: Date;
  public userRole!: string;
  public isActive!: boolean;
  public isDeleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async seedSuperAdmin() {
    const existingAdmin = await User.findOne({
      where: { email: "admin@example.com" },
    });

    if (!existingAdmin) {
      await User.create({
        userName: "Super Admin",
        email: "admin@example.com",
        phoneNumber: "1234567890",
        passwordHash: "yourHashedPasswordHere",
        salt: "randomSaltHere",
        refreshToken: null,
        expiresAt: null,
        userRole: "superadmin",
        isActive: true,
        isDeleted: false,
      });

      console.log("✅ Super Admin seeded successfully.");
    } else {
      console.log("ℹ️ Super Admin already exists.");
    }
  }
}

User.init(
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
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
