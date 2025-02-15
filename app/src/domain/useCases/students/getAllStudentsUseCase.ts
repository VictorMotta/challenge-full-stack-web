export interface GetAllStudentsUseCase {
  perform(): Promise<GetAllStudentsUseCase.Response>;
}

export namespace GetAllStudentsUseCase {
  export type Students = {
    id: number;
    name: string;
    email: string;
    registration_number: string;
    document_number: string;
    created_at: string;
    updated_at: string;
  };

  export type Response = {
    students: GetAllStudentsUseCase.Students[];
  };
}
