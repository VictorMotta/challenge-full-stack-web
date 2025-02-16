import { NextFunction, Request, Response } from "express";
import { createStudentService, getAllStudentsService, updateStudentService } from "services";
import httpStatus from "http-status";

export async function getAllStudentsController(_req: Request, res: Response, next: NextFunction) {
    try {
        const students = await getAllStudentsService();

        const payload = {
            students
        };

        res.json(payload);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function createStudentController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;

        await createStudentService(body);

        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function updateStudentController(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;

        const student = await updateStudentService(body);

        res.status(httpStatus.OK).json({ student });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
