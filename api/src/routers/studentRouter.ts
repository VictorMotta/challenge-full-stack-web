import { createStudentController, getAllStudentsController } from "controllers";
import { Router } from "express";
import { validateBody } from "middlewares";
import { createStudentSchema } from "schemas/studentSchema";

const studentRouter = Router();

studentRouter
    .get("/", getAllStudentsController)
    .post("/", validateBody(createStudentSchema), createStudentController);

export { studentRouter };
