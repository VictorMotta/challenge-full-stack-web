import { Students } from "@prisma/client";
import { prisma } from "config";
import { notFoundError } from "errors/not-found-error";

async function getAllStudents(): Promise<Students[]> {
    const students = await prisma.students.findMany();
    if (!students) throw notFoundError("Students not found!");

    return students;
}

export const studentRepository = {
    getAllStudents
};
