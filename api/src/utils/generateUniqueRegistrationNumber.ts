import { studentRepository } from "repositories";

export async function generateUniqueRegistrationNumber(): Promise<string> {
    const prefix = "RN";

    while (true) {
        const randomNumber = Math.floor(Math.random() * 10 ** 18)
            .toString()
            .padStart(18, "0");
        const registrationData = prefix + randomNumber;

        const exists = await studentRepository.verifyRAExists(registrationData);
        if (!exists) {
            return registrationData;
        }
    }
}
