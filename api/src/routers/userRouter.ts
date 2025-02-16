import { createUserController, getUserController, signInUserController } from "controllers";
import { validateBody, validateParams } from "middlewares";
import { createUserSchema, signInUserSchema } from "schemas";
import { Router } from "express";
import { authenticateToken } from "middlewares/authenticationMiddleware";

const usersRouter = Router();

usersRouter
    .post("/sign-up", validateBody(createUserSchema), createUserController)
    .post("/sign-in", validateBody(signInUserSchema), signInUserController)
    .all("/*", authenticateToken)
    .get("/", getUserController);

export { usersRouter };
