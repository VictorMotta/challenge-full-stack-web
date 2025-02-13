import { ApplicationError } from "../protocols/types";

export function conflictError(): ApplicationError {
	return {
		name: "ConflictError",
		message: "Conflict Error",
	};
}
