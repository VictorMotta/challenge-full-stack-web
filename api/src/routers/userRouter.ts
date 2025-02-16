import { createUserController, signInUserController } from "controllers";
import { validateBody } from "middlewares";
import { createUserSchema, signInUserSchema } from "schemas";
import { Router } from "express";

const usersRouter = Router();

usersRouter
    .post("/sign-up", validateBody(createUserSchema), createUserController)
    .post("/sign-in", validateBody(signInUserSchema), signInUserController);

export { usersRouter };
