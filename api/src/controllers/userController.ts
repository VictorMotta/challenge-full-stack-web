import { NextFunction, Request, Response } from "express";
import { CreateUserReqType, SignInUserReqType } from "protocols/userTypes";
import { createUserService, signInUserService } from "services";
import httpStatus from "http-status";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    const user = req.body as CreateUserReqType;
    try {
        await createUserService(user);
        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export async function signInUserController(req: Request, res: Response, next: NextFunction) {
    const user = req.body as SignInUserReqType;
    try {
        const response = await signInUserService(user);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
