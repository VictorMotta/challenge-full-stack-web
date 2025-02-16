export interface DeleteStudentUseCase {
  perform(
    params: DeleteStudentUseCase.Params
  ): Promise<DeleteStudentUseCase.Response>;
}

export namespace DeleteStudentUseCase {
  export type Params = {
    student_id: number;
  };

  export type Response = void;
}
