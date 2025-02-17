import { Students } from "@prisma/client";
import { prisma } from "../config";
import { internalDatabaseError } from "../errors";

async function getAllStudents(): Promise<Students[]> {
    try {
        const students = await prisma.students.findMany({
            where: {
                active: true
            }
        });

        return students;
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

async function getStudentByDocumentNumberOrEmail(
    document_number: string,
    email: string
): Promise<Students> {
    try {
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
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

async function createStudent({
    document_number,
    email,
    name,
    registration_number
}: Partial<Students>): Promise<Students> {
    try {
        const student = await prisma.students.create({
            data: {
                document_number,
                email,
                name,
                registration_number
            }
        });

        return student;
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

async function verifyRAExists(rn: string): Promise<Students> {
    try {
        const student = await prisma.students.findUnique({
            where: {
                registration_number: rn
            }
        });
        return student;
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

async function verifyStudentExistsById(student_id: number): Promise<Students> {
    try {
        const student = await prisma.students.findUnique({
            where: {
                id: student_id
            }
        });
        return student;
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

async function updateStudent(student_id: number, update: Partial<Students>): Promise<Students> {
    try {
        const student = await prisma.students.update({
            where: {
                id: student_id
            },
            data: update
        });
        return student;
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

async function disableOrActiveStudent(student_id: number, active: boolean): Promise<void> {
    try {
        await prisma.students.update({
            where: {
                id: student_id
            },
            data: {
                active
            }
        });
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

export const studentRepository = {
    getAllStudents,
    getStudentByDocumentNumberOrEmail,
    createStudent,
    verifyRAExists,
    verifyStudentExistsById,
    updateStudent,
    disableOrActiveStudent
};
