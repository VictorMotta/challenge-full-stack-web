import { ApplicationError } from "../protocols/applicationTypes";

export function conflictError(message: string): ApplicationError {
    return {
        name: "ConflictError",
        message
    };
}
