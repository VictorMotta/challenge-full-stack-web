import {
    createStudentController,
    getAllStudentsController,
    updateStudentController
} from "controllers";
import { Router } from "express";
import { validateBody } from "middlewares";
import { createStudentSchema, updateStudentSchema } from "schemas/studentSchema";

const studentRouter = Router();

studentRouter
    .get("/", getAllStudentsController)
    .post("/", validateBody(createStudentSchema), createStudentController)
    .patch("/", validateBody(updateStudentSchema), updateStudentController);

export { studentRouter };
