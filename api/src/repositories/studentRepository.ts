import { Students } from "@prisma/client";
import { prisma } from "config";
import { notFoundError } from "errors/not-found-error";

async function getAllStudents(): Promise<Students[]> {
    const students = await prisma.students.findMany();
    if (!students) throw notFoundError("Students not found!");

    return students;
}

async function getStudentByDocumentNumberOrEmail(
    document_number: string,
    email: string
): Promise<Students> {
    const student = await prisma.students.findFirst({
        where: {
            OR: [
                {
                    document_number: document_number
                },
                {
                    email: email
                }
            ]
        }
    });
    return student;
}

async function createStudent({
    document_number,
    email,
    name,
    registration_number
}: Partial<Students>): Promise<Students> {
    const student = await prisma.students.create({
        data: {
            document_number,
            email,
            name,
            registration_number
        }
    });
    return student;
}

async function verifyRAExists(rn: string): Promise<Students> {
    const student = await prisma.students.findUnique({
        where: {
            registration_number: rn
        }
    });
    return student;
}

export const studentRepository = {
    getAllStudents,
    getStudentByDocumentNumberOrEmail,
    createStudent,
    verifyRAExists
};
