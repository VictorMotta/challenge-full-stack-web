import { ApplicationError } from "../protocols/applicationTypes";

export function unauthorizedError(): ApplicationError {
    return {
        name: "UnauthorizedError",
        message: "Action not allowed. You lack the necessary permissions to modify this content."
    };
}
