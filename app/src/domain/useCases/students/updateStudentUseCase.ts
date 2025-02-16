import type { GetAllStudentsUseCase } from "./getAllStudentsUseCase";

export interface UpdateStudentUseCase {
  perform(
    body: UpdateStudentUseCase.Request
  ): Promise<UpdateStudentUseCase.Response>;
}

export namespace UpdateStudentUseCase {
  export type Request = {
    select: {
      student_id: number;
    };
    update: {
      name: string;
      email: string;
    };
  };

  export type Response = {
    student: GetAllStudentsUseCase.Students;
  };
}
