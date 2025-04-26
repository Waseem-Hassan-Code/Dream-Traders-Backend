import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";

const storeFolder = path.resolve(__dirname, "./Store");
if (!fs.existsSync(storeFolder)) {
  fs.mkdirSync(storeFolder, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(storeFolder, "Capital-Fund.db"),
});

export default sequelize;
