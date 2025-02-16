import { Students } from "@prisma/client";
import { conflictError } from "errors";
import { notFoundError } from "errors/notFoundError";
import { UpdateStudentSchemaType } from "protocols";
import { studentRepository } from "repositories";
import { generateUniqueRegistrationNumber } from "utils";

export async function getAllStudentsService(): Promise<Students[]> {
    const students = await studentRepository.getAllStudents();
    if (!students) return [];

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

export async function updateStudentService(
    body: UpdateStudentSchemaType
): Promise<Partial<Students>> {
    const { select, update } = body;
    const { student_id } = select;

    const student = await studentRepository.verifyStudentExistsById(student_id);
    if (!student) throw notFoundError("Student not found!");

    const newDataStudent = await studentRepository.updateStudent(student_id, update);
    return newDataStudent;
}
