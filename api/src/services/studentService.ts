import { Students } from "@prisma/client";
import { conflictError } from "errors";
import { studentRepository } from "repositories";
import { generateUniqueRegistrationNumber } from "utils";

export async function getAllStudentsService(): Promise<Students[]> {
    const students = await studentRepository.getAllStudents();

    return students;
}

export async function createStudentService(body: Partial<Students>): Promise<void> {
    const { document_number, name, email } = body;
    const student = await studentRepository.getStudentByDocumentNumberOrEmail(
        document_number,
        email
    );
    if (student) throw conflictError("Student already exists");

    const studentRN = await generateUniqueRegistrationNumber();

    const payload = {
        document_number,
        name,
        email,
        registration_number: studentRN
    };
    await studentRepository.createStudent(payload);
}
