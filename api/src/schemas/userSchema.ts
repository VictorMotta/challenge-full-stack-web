import { Users } from "@prisma/client";
import Joi from "joi";

export const createUserSchema = Joi.object<Partial<Users>>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "teacher").required()
});
