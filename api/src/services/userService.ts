import { Users, RolesNames } from "@prisma/client";
import { conflictError } from "errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "repositories";

export async function createUserService(user: Partial<Users>): Promise<void> {
    const { name, email, password, role } = user;
    const userData = await userRepository.getUserByEmail(email);
    if (userData) throw conflictError("User already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const body = {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase() as RolesNames
    };

    await userRepository.createUser(body);
}
