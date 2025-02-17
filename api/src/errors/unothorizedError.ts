import { ApplicationError } from "../protocols/applicationTypes";

export function unauthorizedError(): ApplicationError {
    return {
        name: "UnauthorizedError",
        message: "Token is invalid or expired"
    };
}
