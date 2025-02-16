import { ApplicationError } from "../protocols/types";

export function unauthorizedError(): ApplicationError {
	return {
		name: "UnauthorizedError",
		message: "Token is invalid or expired",
	};
}
