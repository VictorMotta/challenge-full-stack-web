import { ApplicationError } from "../protocols/types";

export function invalidCredentialsError(): ApplicationError {
	return {
		name: "InvalidCredentialsError",
		message: "email or password are incorrect",
	};
}
