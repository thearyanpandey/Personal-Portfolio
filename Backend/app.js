import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectMongoDB from "./db/connectToDB.js";
import errorMiddleware from "./middlewares/error.js";

//Routes Import
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import skillRoute from "./routes/skillRoute.js";
import softwareapplicationRoute from "./routes/softwareapplicationRoute.js";
import timelineRoute from "./routes/timelineRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });


app.use(
  cors({
    //origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    origin: ["myportfolioodashboard.vercel.app", "https://thearyanpandey.vercel.app"],
    method: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

//Essential middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max-file-size
  abortOnLimit: true,
}));

//Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/timeline", timelineRoute);
app.use("/api/v1/skill", skillRoute);
app.use("/api/v1/softwareapplication", softwareapplicationRoute);
app.use("/api/v1/project", projectRoute);

// app.post('/webhook', express.raw({type: 'application/json'}), verifyPayment)

connectMongoDB();
app.use(errorMiddleware);
export default app;
