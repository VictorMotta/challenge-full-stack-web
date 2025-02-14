import { Courses, PrismaClient, Students, Users } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const user: Users | null = await prisma.users.findFirst();
    let student: Students | null = await prisma.students.findFirst();
    let course: Courses | null = await prisma.courses.findFirst();

    const password = await bcrypt.hash("admin", 12);

    if (!user) {
        await prisma.$transaction(async (p) => {
            const userData = await p.users.create({
                data: {
                    email: "admin@admin.com.br",
                    password: password,
                    name: "admin",
                    role: "ADMIN"
                }
            });

            await p.logs.create({
                data: {
                    description: "Usuário admin criado",
                    user_id: userData.id
                }
            });

            return userData;
        });
    }
    const registration_number = "RA321321333333333333";
    if (!student) {
        student = await prisma.students.create({
            data: {
                name: "Aluno 1",
                email: "aluno_um@email.com.br",
                registration_number: registration_number,
                document_number: "12312312312"
            }
        });
    }
    if (!course) {
        course = await prisma.courses.create({
            data: {
                name: "Egenharia da computação",
                description: "Curso focado em programação e hardware",
                workload: 3600
            }
        });
    }

    if (student && course) {
        await prisma.enrollments.create({
            data: {
                status: "ACTIVE",
                course_id: course!.id,
                student_id: student!.id
            }
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
