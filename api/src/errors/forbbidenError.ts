import { ApplicationError } from "../protocols/applicationTypes";

export function forbbidenError(message: string): ApplicationError {
    return {
        name: "InvalidCredentialsError",
        message
    };
}
