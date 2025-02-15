import { Request, Response, NextFunction } from "express";
import {
    getAllStudentsController,
    createStudentController
} from "../../../src/controllers/studentController";
import { createStudentService, getAllStudentsService } from "../../../src/services";
import httpStatus from "http-status";

jest.mock("../../../src/services");

describe("Student Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            sendStatus: jest.fn()
        };
        next = jest.fn();
    });

    describe("getAllStudentsController", () => {
        it("should return all students", async () => {
            const students = [{ id: 1, name: "John Doe" }];
            (getAllStudentsService as jest.Mock).mockResolvedValue(students);

            await getAllStudentsController(req as Request, res as Response, next);

            expect(getAllStudentsService).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ students });
        });

        it("should handle errors", async () => {
            const error = new Error("Something went wrong");
            (getAllStudentsService as jest.Mock).mockRejectedValue(error);

            await getAllStudentsController(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("createStudentController", () => {
        it("should create a student and return 201 status", async () => {
            req.body = { name: "Jane Doe" };

            await createStudentController(req as Request, res as Response, next);

            expect(createStudentService).toHaveBeenCalledWith(req.body);
            expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.CREATED);
        });

        it("should handle errors", async () => {
            const error = new Error("Something went wrong");
            (createStudentService as jest.Mock).mockRejectedValue(error);

            await createStudentController(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
