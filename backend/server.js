import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

import sequelize, { initDb } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

let dbInitialized = false;

async function initializeDatabase() {
    if (dbInitialized) {
        return;
    }

    await initDb();

    await sequelize.sync();

    console.log("Database synchronized");

    dbInitialized = true;
}

const server = serverless(app);

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await initializeDatabase();

    return server(event, context);
};