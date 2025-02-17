import {
    createStudentController,
    deleteStudentController,
    getAllStudentsController,
    updateStudentController
} from "controllers";
import { Router } from "express";
import { validateBody, validateQuery } from "middlewares";
import { authenticateToken } from "middlewares/authenticationMiddleware";
import { createStudentSchema, deleteStudentSchema, updateStudentSchema } from "schemas";

const studentRouter = Router();

studentRouter
    .all("/*", authenticateToken)
    .get("/", getAllStudentsController)
    .post("/", validateBody(createStudentSchema), createStudentController)
    .patch("/", validateBody(updateStudentSchema), updateStudentController)
    .delete("/", validateQuery(deleteStudentSchema), deleteStudentController);

export { studentRouter };
