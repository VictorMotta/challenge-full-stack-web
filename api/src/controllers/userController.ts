import { NextFunction, Request, Response } from "express";
import { CreateUserReqType, SignInUserReqType } from "protocols/userTypes";
import { createUserService, getUserService, signInUserService } from "services";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "middlewares/authenticationMiddleware";

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

export async function getUserController(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const id = req.userId;
    try {
        const response = await getUserService(id);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
