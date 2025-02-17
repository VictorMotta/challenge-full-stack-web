import "express-async-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "./config";
import { handleApplicationErrors } from "middlewares";
import { studentRouter, usersRouter } from "routers";

loadEnv();

const app: Express = express();

app.use(cors())
    .use(express.json())
    .get("/health", (_req: Request, res: Response) => {
        res.send("OK!");
    })
    .use("/student", studentRouter)
    .use("/user", usersRouter)
    .use((err: Error, req: Request, res: Response, next: NextFunction) => {
        handleApplicationErrors(err, req, res, next);
    });

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;
