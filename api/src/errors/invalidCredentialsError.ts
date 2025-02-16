import { ApplicationError } from "../protocols/applicationTypes";

export function invalidCredentialsError(): ApplicationError {
    return {
        name: "InvalidCredentialsError",
        message: "email or password are incorrect"
    };
}
