import { RequestHelper } from "@/utils/helpers/RequestHelper";
import type { DeleteStudentUseCase } from "@/domain/useCases/students/deleteStudentUseCase";

export class DeleteStudentService implements DeleteStudentUseCase {
  static instance = new DeleteStudentService();

  constructor(private readonly requestHelper = RequestHelper.instance) {}

  async perform(
    params: DeleteStudentUseCase.Params
  ): Promise<DeleteStudentUseCase.Response> {
    const response =
      await this.requestHelper.make<DeleteStudentUseCase.Response>({
        method: "DELETE",
        url: `/student?student_id=${params.student_id}`
      });

    if ("error" in response) throw response.error;

    return response.body;
  }
}
