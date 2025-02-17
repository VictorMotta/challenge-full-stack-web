import { prisma } from "config";
import { userRepository } from "repositories/userRepository";
import { internalDatabaseError } from "errors";
import { RolesNames } from "@prisma/client";

jest.mock("config", () => ({
    prisma: {
        users: {
            findUnique: jest.fn(),
            create: jest.fn()
        }
    }
}));

describe("userRepository", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getUserByEmail", () => {
        it("should return user when found", async () => {
            const mockUser = { id: 1, email: "test@example.com" };
            (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

            const result = await userRepository.getUserByEmail("test@example.com");

            expect(result).toEqual(mockUser);
            expect(prisma.users.findUnique).toHaveBeenCalledWith({
                where: { email: "test@example.com" }
            });
        });

        it("should throw internalDatabaseError on error", async () => {
            (prisma.users.findUnique as jest.Mock).mockRejectedValue(new Error("Database error"));

            try {
                await userRepository.getUserByEmail("test@example.com");
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
        });
    });

    describe("getUserById", () => {
        it("should return user when found", async () => {
            const mockUser = { id: 1, email: "test@example.com" };
            (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

            const result = await userRepository.getUserById(1);

            expect(result).toEqual(mockUser);
            expect(prisma.users.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
        });

        it("should throw internalDatabaseError on error", async () => {
            (prisma.users.findUnique as jest.Mock).mockRejectedValue(new Error("Database error"));

            try {
                await userRepository.getUserById(1);
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
        });
    });

    describe("createUser", () => {
        it("should create user successfully", async () => {
            const mockUser = {
                name: "John Doe",
                email: "john@example.com",
                password: "password",
                role: "ADMIN" as RolesNames
            };
            (prisma.users.create as jest.Mock).mockResolvedValue(undefined);

            await userRepository.createUser(mockUser);

            expect(prisma.users.create).toHaveBeenCalledWith({
                data: mockUser
            });
        });

        it("should throw internalDatabaseError on error", async () => {
            (prisma.users.create as jest.Mock).mockRejectedValue(new Error("Database error"));

            try {
                await userRepository.createUser({
                    name: "John Doe",
                    email: "john@example.com",
                    password: "password",
                    role: "ADMIN"
                });
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.users.create).toHaveBeenCalledTimes(1);
        });
    });
});
