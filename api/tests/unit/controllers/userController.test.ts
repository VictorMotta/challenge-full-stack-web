import { NextFunction, Request, Response } from "express";
import {
    createUserController,
    signInUserController,
    getUserController
} from "../../../src/controllers/userController";
import { createUserService, getUserService, signInUserService } from "../../../src/services";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../../../src/protocols/authenticationTypes";

jest.mock("../../../src/services");

describe("User Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn()
        };
        next = jest.fn();
    });

    describe("createUserController", () => {
        it("should create a user and return 201 status", async () => {
            req.body = {
                name: "testuser",
                email: "testuser@email.com",
                password: "testpass",
                role: "admin"
            };
            (createUserService as jest.Mock).mockResolvedValueOnce(undefined);

            await createUserController(req as Request, res as Response, next);

            expect(createUserService).toHaveBeenCalledWith(req.body);
            expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.CREATED);
        });

        it("should call next with error if service fails", async () => {
            const error = new Error("Service error");
            req.body = { username: "testuser", password: "testpass" };
            (createUserService as jest.Mock).mockRejectedValueOnce(error);

            await createUserController(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("signInUserController", () => {
        it("should sign in a user and return 200 status with response", async () => {
            req.body = { username: "testuser", password: "testpass" };
            const serviceResponse = { token: "testtoken" };
            (signInUserService as jest.Mock).mockResolvedValueOnce(serviceResponse);

            await signInUserController(req as Request, res as Response, next);

            expect(signInUserService).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(serviceResponse);
        });

        it("should call next with error if service fails", async () => {
            const error = new Error("Service error");
            req.body = { username: "testuser", password: "testpass" };
            (signInUserService as jest.Mock).mockRejectedValueOnce(error);

            await signInUserController(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getUserController", () => {
        it("should get a user and return 200 status with response", async () => {
            (req as AuthenticatedRequest).userId = 1;
            const serviceResponse = { id: "testuserid", username: "testuser" };
            (getUserService as jest.Mock).mockResolvedValueOnce(serviceResponse);

            await getUserController(req as AuthenticatedRequest, res as Response, next);

            expect(getUserService).toHaveBeenCalledWith((req as AuthenticatedRequest).userId);
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(serviceResponse);
        });

        it("should call next with error if service fails", async () => {
            const error = new Error("Service error");
            (req as AuthenticatedRequest).userId = 1;
            (getUserService as jest.Mock).mockRejectedValueOnce(error);

            await getUserController(req as AuthenticatedRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
