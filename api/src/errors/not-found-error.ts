import { ApplicationError } from "../protocols/types";

export function notFoundError(message: string): ApplicationError {
	return {
		name: "NotFoundError",
		message,
	};
}
