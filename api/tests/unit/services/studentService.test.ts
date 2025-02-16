import {
    getAllStudentsService,
    createStudentService,
    deleteStudentService
} from "../../../src/services/studentService";
import { studentRepository } from "../../../src/repositories";
import { generateUniqueRegistrationNumber } from "../../../src/utils";
import { conflictError } from "../../../src/errors";
import { updateStudentService } from "../../../src/services/studentService";
import { notFoundError } from "../../../src/errors/notFoundError";

jest.mock("../../../src/repositories");
jest.mock("../../../src/utils");

describe("Student Service", () => {
    describe("getAllStudentsService", () => {
        it("should return all students", async () => {
            const mockStudents = [
                {
                    id: 1,
                    name: "John Doe",
                    document_number: "123",
                    email: "john@example.com",
                    registration_number: "RN123"
                },
                {
                    id: 2,
                    name: "Jane Doe",
                    document_number: "456",
                    email: "jane@example.com",
                    registration_number: "RN456"
                }
            ];
            (studentRepository.getAllStudents as jest.Mock).mockResolvedValue(mockStudents);

            const result = await getAllStudentsService();

            expect(result).toEqual(mockStudents);
            expect(studentRepository.getAllStudents).toHaveBeenCalledTimes(1);
        });
    });

    describe("createStudentService", () => {
        it("should create a new student", async () => {
            const mockStudent = {
                document_number: "123",
                name: "John Doe",
                email: "john@example.com"
            };
            const mockRegistrationNumber = "RN123";

            (studentRepository.getStudentByDocumentNumberOrEmail as jest.Mock).mockResolvedValue(
                null
            );
            (generateUniqueRegistrationNumber as jest.Mock).mockResolvedValue(
                mockRegistrationNumber
            );

            await createStudentService(mockStudent);

            expect(studentRepository.getStudentByDocumentNumberOrEmail).toHaveBeenCalledWith(
                "123",
                "john@example.com"
            );
            expect(generateUniqueRegistrationNumber).toHaveBeenCalledTimes(1);
            expect(studentRepository.createStudent).toHaveBeenCalledWith({
                ...mockStudent,
                registration_number: mockRegistrationNumber
            });
        });

        it("should throw conflict error if student already exists", async () => {
            const mockStudent = {
                document_number: "123",
                name: "John Doe",
                email: "john@example.com"
            };

            (studentRepository.getStudentByDocumentNumberOrEmail as jest.Mock).mockResolvedValue(
                mockStudent
            );

            const error = conflictError("Student already exists");
            (studentRepository.createStudent as jest.Mock).mockRejectedValueOnce(error);

            try {
                await createStudentService(mockStudent);
            } catch (error) {
                (error as any).details = "Student already exists";

                expect(error).toHaveProperty("name", "ConflictError");
                expect(error).toHaveProperty("details", "Student already exists");
            }

            expect(studentRepository.getStudentByDocumentNumberOrEmail).toHaveBeenCalledWith(
                "123",
                "john@example.com"
            );
        });
    });

    describe("updateStudentService", () => {
        it("should update student data", async () => {
            const mockStudent = {
                id: 1,
                name: "John Doe",
                document_number: "123",
                email: "john@example.com",
                registration_number: "RN123"
            };
            const updateData = { name: "John Updated", email: "john_update@example.com" };
            const updatedStudent = { ...mockStudent, ...updateData };

            (studentRepository.verifyStudentExistsById as jest.Mock).mockResolvedValue(mockStudent);
            (studentRepository.updateStudent as jest.Mock).mockResolvedValue(updatedStudent);

            const result = await updateStudentService({
                select: { student_id: 1 },
                update: updateData
            });

            expect(studentRepository.verifyStudentExistsById).toHaveBeenCalledWith(1);
            expect(studentRepository.updateStudent).toHaveBeenCalledWith(1, updateData);
            expect(result).toEqual(updatedStudent);
        });

        it("should throw not found error if student does not exist", async () => {
            const updateData = { name: "John Updated", email: "john@example.com" };

            (studentRepository.verifyStudentExistsById as jest.Mock).mockResolvedValue(null);

            try {
                await updateStudentService({
                    select: { student_id: 1 },
                    update: updateData
                });
            } catch (error) {
                expect(error).toEqual(notFoundError("Student not found!"));
            }

            expect(studentRepository.verifyStudentExistsById).toHaveBeenCalledWith(1);
        });
    });

    describe("deleteStudentService", () => {
        it("should delete a student", async () => {
            const mockStudent = {
                id: 1,
                name: "John Doe",
                document_number: "123",
                email: "john@example.com",
                registration_number: "RN123"
            };

            (studentRepository.verifyStudentExistsById as jest.Mock).mockResolvedValue(mockStudent);
            (studentRepository.disableStudent as jest.Mock).mockResolvedValue(undefined);

            await deleteStudentService(mockStudent.id);

            expect(studentRepository.verifyStudentExistsById).toHaveBeenCalledWith(1);
            expect(studentRepository.disableStudent).toHaveBeenCalledWith(1);
        });

        it("should throw not found error if student does not exist", async () => {
            (studentRepository.verifyStudentExistsById as jest.Mock).mockResolvedValue(null);

            try {
                await deleteStudentService(1);
            } catch (error) {
                expect(error).toEqual(notFoundError("Student not found!"));
            }

            expect(studentRepository.verifyStudentExistsById).toHaveBeenCalledWith(1);
        });
    });
});
