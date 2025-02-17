import { Response, NextFunction } from "express";
import {
    getAllStudentsController,
    createStudentController,
    updateStudentController,
    deleteStudentController
} from "../../../src/controllers/studentController";
import {
    createStudentService,
    getAllStudentsService,
    updateStudentService,
    deleteStudentService
} from "../../../src/services";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "protocols/authenticationTypes";

jest.mock("../../../src/services");

describe("Student Controller", () => {
    beforeEach(() => {
        req = {
            role: "admin" // 🔹 Garante que a role esteja definida
        };
        res = {
            json: jest.fn(),
            sendStatus: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });
    let req: Partial<AuthenticatedRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            sendStatus: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    describe("getAllStudentsController", () => {
        it("should return all students", async () => {
            const students = [{ id: 1, name: "John Doe" }];
            (getAllStudentsService as jest.Mock).mockResolvedValue(students);

            await getAllStudentsController(req as AuthenticatedRequest, res as Response, next);

            expect(getAllStudentsService).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ students });
        });

        it("should handle errors", async () => {
            const error = new Error("Something went wrong");
            (getAllStudentsService as jest.Mock).mockRejectedValue(error);

            await getAllStudentsController(req as AuthenticatedRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("createStudentController", () => {
        it("should create a student and return 201 status", async () => {
            req.body = { name: "Jane Doe" };
            req.role = "admin";

            (createStudentService as jest.Mock).mockResolvedValue({ id: 1, name: "Jane Doe" });

            await createStudentController(req as AuthenticatedRequest, res as Response, next);

            expect(createStudentService).toHaveBeenCalledWith(req.body);
            expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.CREATED);
        });

        it("should handle errors", async () => {
            const error = {
                name: "UnauthorizedError",
                message:
                    "Action not allowed. You lack the necessary permissions to modify this content."
            };
            (createStudentService as jest.Mock).mockRejectedValue(error);

            await createStudentController(req as AuthenticatedRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("updateStudentController", () => {
        it("should update a student and return 200 status with the student data", async () => {
            req.body = { id: 1, name: "John Doe Updated" };
            req.role = "admin";
            const updatedStudent = { id: 1, name: "John Doe Updated" };
            (updateStudentService as jest.Mock).mockResolvedValue(updatedStudent);

            await updateStudentController(req as AuthenticatedRequest, res as Response, next);

            expect(updateStudentService).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({ student: updatedStudent });
        });

        it("should handle errors", async () => {
            const error = {
                name: "UnauthorizedError",
                message:
                    "Action not allowed. You lack the necessary permissions to modify this content."
            };

            (updateStudentService as jest.Mock).mockRejectedValue(error);

            await updateStudentController(req as AuthenticatedRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("deleteStudentController", () => {
        it("should delete a student and return 204 status", async () => {
            req.query = { student_id: "1" };
            req.role = "admin";

            await deleteStudentController(req as AuthenticatedRequest, res as Response, next);

            expect(deleteStudentService).toHaveBeenCalledWith(1);
            expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
        });

        it("should handle errors", async () => {
            const error = {
                name: "UnauthorizedError",
                message:
                    "Action not allowed. You lack the necessary permissions to modify this content."
            };
            req.query = { student_id: "1" };
            (deleteStudentService as jest.Mock).mockRejectedValue(error);

            await deleteStudentController(req as AuthenticatedRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
