import { NextFunction, Request, Response } from "express";
import {
    createStudentService,
    deleteStudentService,
    getAllStudentsService,
    updateStudentService
} from "services";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "protocols/authenticationTypes";
import { unauthorizedError } from "errors";

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

export async function createStudentController(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const role = req.role || ""; // 🔹 Garante que role nunca seja undefined
        if (role.toLowerCase() !== "admin") {
            throw unauthorizedError();
        }

        const body = req.body;

        await createStudentService(body);

        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function updateStudentController(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const role = req.role || ""; // 🔹 Garante que role nunca seja undefined
        if (role.toLowerCase() !== "admin") {
            throw unauthorizedError();
        }

        const body = req.body;

        const student = await updateStudentService(body);

        res.status(httpStatus.OK).json({ student });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function deleteStudentController(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const role = req.role || ""; // 🔹 Garante que role nunca seja undefined
        if (role.toLowerCase() !== "admin") {
            throw unauthorizedError();
        }

        const student_id = req.query.student_id;

        await deleteStudentService(Number(student_id));

        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        console.error(error);
        next(error);
    }
}
