import { ApplicationError } from "../protocols/applicationTypes";

export function internalDatabaseError(): ApplicationError {
    return {
        name: "InternalDatabaseError",
        message: "An error occurred in the database, please call support!"
    };
}
