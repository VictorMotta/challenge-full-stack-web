export interface CreateStudentUseCase {
  perform(
    body: CreateStudentUseCase.Request
  ): Promise<CreateStudentUseCase.Response>;
}

export namespace CreateStudentUseCase {
  export type Request = {
    name: string;
    email: string;
    document_number: string;
  };

  export type Response = string;
}
