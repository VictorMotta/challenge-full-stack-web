import {
    createUserService,
    signInUserService,
    getUserService
} from "../../../src/services/userService";
import { userRepository } from "../../../src/repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { conflictError, invalidCredentialsError } from "../../../src/errors";
import { notFoundError } from "../../../src/errors/notFoundError";
import { CreateUserReqType, SignInUserReqType } from "../../../src/protocols/userTypes";
import { Users } from "@prisma/client";

jest.mock("../../../src/repositories");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createUserService", () => {
        it("should create a new user", async () => {
            const user: CreateUserReqType = {
                name: "John Doe",
                email: "john@example.com",
                password: "hashedPassword",
                role: "user"
            };

            (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
            (userRepository.createUser as jest.Mock).mockResolvedValue(undefined);

            await createUserService(user);

            expect(userRepository.getUserByEmail).toHaveBeenCalledWith(user.email);
            expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
            expect(userRepository.createUser).toHaveBeenCalledWith({
                name: user.name,
                email: user.email,
                password: "hashedPassword",
                role: "USER"
            });
        });

        it("should throw conflict error if user already exists", async () => {
            const user: CreateUserReqType = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                role: "user"
            };

            (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(user);

            try {
                await createUserService(user);
            } catch (error) {
                expect(error).toEqual(conflictError("User already exists"));
            }
        });
    });

    describe("signInUserService", () => {
        it("should sign in a user", async () => {
            const hashedPassword = "hashedPassword";
            const user: SignInUserReqType = {
                email: "john@example.com",
                password: "password123"
            };

            const userData: Users = {
                id: 1,
                email: "john@example.com",
                password: hashedPassword,
                role: "ADMIN",
                name: "John Doe",
                created_at: new Date(),
                updated_at: new Date()
            };

            (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(userData);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue("token");

            const result = await signInUserService(user);

            expect(bcrypt.compare).toHaveBeenCalledWith(user.password, hashedPassword);
            expect(result).toEqual({
                user: { ...userData },
                token: "token"
            });
        });

        it("should throw not found error if user does not exist", async () => {
            const user: SignInUserReqType = {
                email: "john@example.com",
                password: "password123"
            };

            (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

            try {
                await signInUserService(user);
            } catch (error) {
                expect(error).toEqual(notFoundError("User not found"));
            }
        });

        it("should throw invalid credentials error if password is incorrect", async () => {
            const user: SignInUserReqType = {
                email: "john@example.com",
                password: "password123"
            };

            const userData = {
                id: 1,
                email: "john@example.com",
                password: "hashedPassword",
                role: "USER"
            };

            (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(userData);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            try {
                await signInUserService(user);
            } catch (error) {
                expect(error).toEqual(invalidCredentialsError());
            }
        });
    });

    describe("getUserService", () => {
        it("should get a user by id", async () => {
            const userId = 1;
            const user: Users = {
                id: userId,
                name: "John Doe",
                email: "john@example.com",
                password: "hashedPassword",
                role: "ADMIN",
                created_at: new Date(),
                updated_at: new Date()
            };

            (userRepository.getUserById as jest.Mock).mockResolvedValue(user);

            const result = await getUserService(userId);

            expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
            expect(result).toEqual(user);
        });

        it("should throw not found error if user does not exist", async () => {
            const userId = 1;

            (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

            try {
                await getUserService(userId);
            } catch (error) {
                expect(error).toEqual(notFoundError("User not found"));
            }
        });
    });
});
