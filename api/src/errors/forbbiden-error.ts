import { ApplicationError } from "../protocols/types";

export function forbbidenError(message: string): ApplicationError {
	return {
		name: "InvalidCredentialsError",
		message,
	};
}
