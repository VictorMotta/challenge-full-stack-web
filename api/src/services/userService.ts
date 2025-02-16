import { RolesNames } from "@prisma/client";
import { conflictError, invalidCredentialsError } from "errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "repositories";
import { notFoundError } from "errors/notFoundError";
import { CreateUserReqType, SignInUserReqType, SignInUserResType } from "protocols/userTypes";

export async function createUserService(user: CreateUserReqType): Promise<void> {
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

export async function signInUserService(user: SignInUserReqType): Promise<SignInUserResType> {
    const { email, password } = user;

    const userData = await userRepository.getUserByEmail(email);
    if (!userData) throw notFoundError("User not found");

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) throw invalidCredentialsError();

    const token = jwt.sign(
        { userId: userData.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Expira em 7 dias
    );

    delete userData.password;

    return { user: userData, token };
}
