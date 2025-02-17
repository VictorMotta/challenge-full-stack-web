import Joi from "joi";
import { CreateUserReqType, SignInUserReqType } from "../protocols/userTypes";

export const createUserSchema = Joi.object<CreateUserReqType>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "teacher").required()
});

export const signInUserSchema = Joi.object<SignInUserReqType>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
