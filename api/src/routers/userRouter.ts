import { createUserController } from "controllers";
import { validateBody } from "middlewares";
import { createUserSchema } from "schemas";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/sign-up", validateBody(createUserSchema), createUserController);
// .post("/sign-in", validateBody(signInUserSchema), signInUser);

export { usersRouter };
