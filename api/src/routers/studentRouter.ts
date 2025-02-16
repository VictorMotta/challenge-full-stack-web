import {
    createStudentController,
    deleteStudentController,
    getAllStudentsController,
    updateStudentController
} from "controllers";
import { Router } from "express";
import { validateBody, validateParams, validateQuery } from "middlewares";
import { createStudentSchema, deleteStudentSchema, updateStudentSchema } from "schemas";

const studentRouter = Router();

studentRouter
    .get("/", getAllStudentsController)
    .post("/", validateBody(createStudentSchema), createStudentController)
    .patch("/", validateBody(updateStudentSchema), updateStudentController)
    .delete("/", validateQuery(deleteStudentSchema), deleteStudentController);

export { studentRouter };
