import { Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { createUserService } from "services";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    const user = req.body as Partial<Users>;
    try {
        await createUserService(user);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
