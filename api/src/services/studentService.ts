import { Students } from "@prisma/client";
import { studentRepository } from "repositories";

export async function getAllStudentsService(): Promise<Students[]> {
    const students = await studentRepository.getAllStudents();

    return students;
}
