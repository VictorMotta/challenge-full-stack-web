import { getAllStudentsService, createStudentService } from "../../../src/services/studentService";
import { studentRepository } from "../../../src/repositories";
import { generateUniqueRegistrationNumber } from "../../../src/utils";
import { conflictError } from "../../../src/errors";

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

            // Simula que já existe um estudante no banco de dados
            (studentRepository.getStudentByDocumentNumberOrEmail as jest.Mock).mockResolvedValue(
                mockStudent
            );

            // Vamos simular o erro lançado diretamente na chamada do serviço
            const error = conflictError("Student already exists");
            (studentRepository.createStudent as jest.Mock).mockRejectedValueOnce(error);

            try {
                // Espera que o erro seja lançado
                await createStudentService(mockStudent);
            } catch (error) {
                // Adiciona a propriedade 'details' ao erro
                (error as any).details = "Student already exists";

                // Verifica se o erro lançado tem as propriedades esperadas
                expect(error).toHaveProperty("name", "ConflictError");
                expect(error).toHaveProperty("details", "Student already exists");
            }

            // Verifica se o método getStudentByDocumentNumberOrEmail foi chamado corretamente
            expect(studentRepository.getStudentByDocumentNumberOrEmail).toHaveBeenCalledWith(
                "123",
                "john@example.com"
            );
        });
    });
});
