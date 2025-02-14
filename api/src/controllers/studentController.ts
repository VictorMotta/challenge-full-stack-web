import { NextFunction, Request, Response } from "express";
import { getAllStudentsService } from "services";

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
