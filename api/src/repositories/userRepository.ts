import { Users } from "@prisma/client";
import { prisma } from "config";
import { internalDatabaseError } from "errors";

async function getUserByEmail(email: string): Promise<Users> {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });

        return user;
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

async function createUser(user: Partial<Users>): Promise<void> {
    const { name, email, password, role } = user;
    try {
        await prisma.users.create({
            data: {
                name,
                email,
                password,
                role
            }
        });
    } catch (error) {
        console.log(error);
        throw internalDatabaseError();
    }
}

export const userRepository = { getUserByEmail, createUser };
