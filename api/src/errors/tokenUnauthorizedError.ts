import { ApplicationError } from "../protocols/applicationTypes";

export function tokenUnauthorizedError(): ApplicationError {
    return {
        name: "UnauthorizedError",
        message: "Token is invalid or expired"
    };
}
