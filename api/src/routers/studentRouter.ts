import { getAllStudentsController } from "controllers";
import { Router } from "express";

const studentRouter = Router();

studentRouter.get("/", getAllStudentsController);

export { studentRouter };
