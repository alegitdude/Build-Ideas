import "express-async-errors";
import express from "express";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import cookieParser from "cookie-parser";
// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import ideasRouter from "./routes/ideasRoutes.js";
import rankedIdeasRouter from "./routes/rankedIdeasRoutes.js";
import voteRouter from "./routes/voteRoutes.js";
import homeRouter from "./routes/home.js";

// middlware
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/errror-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(cookieParser());
app.get("/api/v1", (req, res) => {
  res.send({ msg: "Welcome" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/ideas", authenticateUser, ideasRouter);
app.use("/api/v1/rankedideas", authenticateUser, rankedIdeasRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/vote", authenticateUser, voteRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
