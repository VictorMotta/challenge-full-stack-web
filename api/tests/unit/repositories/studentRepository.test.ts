import { prisma } from "config";
import { studentRepository } from "../../../src/repositories/studentRepository";
import { internalDatabaseError } from "errors";

jest.mock("config", () => ({
    prisma: {
        students: {
            findMany: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn()
        }
    }
}));

describe("studentRepository", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllStudents", () => {
        it("should return all students", async () => {
            const mockStudents = [{ id: 1, name: "John Doe" }];
            (prisma.students.findMany as jest.Mock).mockResolvedValue(mockStudents);

            const result = await studentRepository.getAllStudents();

            expect(result).toEqual(mockStudents);
            expect(prisma.students.findMany).toHaveBeenCalledTimes(1);
        });

        it("should throw an internalDatabaseError on failure", async () => {
            (prisma.students.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));

            try {
                await studentRepository.getAllStudents();
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.students.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe("getStudentByDocumentNumberOrEmail", () => {
        it("should return a student by document number or email", async () => {
            const mockStudent = { id: 1, name: "John Doe" };
            (prisma.students.findFirst as jest.Mock).mockResolvedValue(mockStudent);

            const result = await studentRepository.getStudentByDocumentNumberOrEmail(
                "123456",
                "john@example.com"
            );

            expect(result).toEqual(mockStudent);
            expect(prisma.students.findFirst).toHaveBeenCalledTimes(1);
            expect(prisma.students.findFirst).toHaveBeenCalledWith({
                where: {
                    OR: [{ document_number: "123456" }, { email: "john@example.com" }]
                }
            });
        });

        it("should throw an internalDatabaseError on failure", async () => {
            (prisma.students.findFirst as jest.Mock).mockRejectedValue(new Error("Database error"));

            try {
                await studentRepository.getStudentByDocumentNumberOrEmail(
                    "123456",
                    "john@example.com"
                );
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.students.findFirst).toHaveBeenCalledTimes(1);
        });
    });

    describe("createStudent", () => {
        it("should create a new student", async () => {
            const mockStudent = { id: 1, name: "John Doe" };
            (prisma.students.create as jest.Mock).mockResolvedValue(mockStudent);

            const result = await studentRepository.createStudent({
                document_number: "123456",
                email: "john@example.com",
                name: "John Doe",
                registration_number: "RN123"
            });

            expect(result).toEqual(mockStudent);
            expect(prisma.students.create).toHaveBeenCalledTimes(1);
            expect(prisma.students.create).toHaveBeenCalledWith({
                data: {
                    document_number: "123456",
                    email: "john@example.com",
                    name: "John Doe",
                    registration_number: "RN123"
                }
            });
        });

        it("should throw an internalDatabaseError on failure", async () => {
            (prisma.students.create as jest.Mock).mockRejectedValue(new Error("Database error"));

            try {
                await studentRepository.createStudent({
                    document_number: "123456",
                    email: "john@example.com",
                    name: "John Doe",
                    registration_number: "RN123"
                });
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.students.create).toHaveBeenCalledTimes(1);
        });
    });

    describe("verifyRAExists", () => {
        it("should return a student if registration number exists", async () => {
            const mockStudent = { id: 1, name: "John Doe" };
            (prisma.students.findUnique as jest.Mock).mockResolvedValue(mockStudent);

            const result = await studentRepository.verifyRAExists("RN123");

            expect(result).toEqual(mockStudent);
            expect(prisma.students.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.students.findUnique).toHaveBeenCalledWith({
                where: { registration_number: "RN123" }
            });
        });

        it("should throw an internalDatabaseError on failure", async () => {
            (prisma.students.findUnique as jest.Mock).mockRejectedValue(internalDatabaseError());

            try {
                await studentRepository.verifyRAExists("RN123");
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.students.findUnique).toHaveBeenCalledTimes(1);
        });
    });

    describe("verifyStudentExistsById", () => {
        it("should return a student if student ID exists", async () => {
            const mockStudent = { id: 1, name: "John Doe" };
            (prisma.students.findUnique as jest.Mock).mockResolvedValue(mockStudent);

            const result = await studentRepository.verifyStudentExistsById(1);

            expect(result).toEqual(mockStudent);
            expect(prisma.students.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.students.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
        });

        it("should throw an internalDatabaseError on failure", async () => {
            (prisma.students.findUnique as jest.Mock).mockRejectedValue(internalDatabaseError());

            try {
                await studentRepository.verifyStudentExistsById(1);
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.students.findUnique).toHaveBeenCalledTimes(1);
        });
    });

    describe("updateStudent", () => {
        it("should update a student", async () => {
            const mockStudent = { id: 1, name: "John Doe", email: "john@example.com" };
            (prisma.students.update as jest.Mock).mockResolvedValue(mockStudent);

            const result = await studentRepository.updateStudent(1, { name: "John Doe" });

            expect(result).toEqual(mockStudent);
            expect(prisma.students.update).toHaveBeenCalledTimes(1);
            expect(prisma.students.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { name: "John Doe" }
            });
        });

        it("should throw an internalDatabaseError on failure", async () => {
            (prisma.students.update as jest.Mock).mockRejectedValue(internalDatabaseError());

            try {
                await studentRepository.updateStudent(1, { name: "John Doe" });
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.students.update).toHaveBeenCalledTimes(1);
        });
    });

    describe("disableStudent", () => {
        it("should disable a student", async () => {
            (prisma.students.update as jest.Mock).mockResolvedValue(undefined);

            await studentRepository.disableOrActiveStudent(1, false);

            expect(prisma.students.update).toHaveBeenCalledTimes(1);
            expect(prisma.students.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { active: false }
            });
        });

        it("should throw an internalDatabaseError on failure", async () => {
            (prisma.students.update as jest.Mock).mockRejectedValue(internalDatabaseError());

            try {
                await studentRepository.disableOrActiveStudent(1, false);
            } catch (error) {
                (error as any).details = "An error occurred in the database, please call support!";

                expect(error).toHaveProperty("name", "InternalDatabaseError");
                expect(error).toHaveProperty(
                    "details",
                    "An error occurred in the database, please call support!"
                );
            }

            expect(prisma.students.update).toHaveBeenCalledTimes(1);
        });
    });
});
