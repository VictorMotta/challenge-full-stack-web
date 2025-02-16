import { Students } from "@prisma/client";
import Joi from "joi";
import { UpdateStudentSchemaType } from "protocols";

export const createStudentSchema = Joi.object<Partial<Students>>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    document_number: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(11)
        .required()
});

export const updateStudentSchema = Joi.object<UpdateStudentSchemaType>({
    select: Joi.object({
        student_id: Joi.number().required()
    }),
    update: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    })
});
