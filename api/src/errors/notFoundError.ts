import { ApplicationError } from "../protocols/applicationTypes";

export function notFoundError(message: string): ApplicationError {
    return {
        name: "NotFoundError",
        message
    };
}
