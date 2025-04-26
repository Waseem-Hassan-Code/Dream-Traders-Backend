import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./Router/index";
import dbContext from "./DataBase/DbContext";
// import seedDatabase from "./DataBase/SeedData";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use("/", router());

const startServer = async () => {
  try {
    await dbContext.authenticate();
    console.log("Database connection has been established successfully.");

    await dbContext.sync({ alter: true });
    // seedDatabase();

    server.listen(8080, () => {
      console.log("Server running on HTTP port 8080 🚀");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
