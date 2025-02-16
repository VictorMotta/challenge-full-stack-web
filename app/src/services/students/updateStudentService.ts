import { RequestHelper } from "@/utils/helpers/RequestHelper";
import type { UpdateStudentUseCase } from "@/domain/useCases/students/updateStudentUseCase";

export class UpdateStudentService implements UpdateStudentUseCase {
  static instance = new UpdateStudentService();

  constructor(private readonly requestHelper = RequestHelper.instance) {}

  async perform(
    body: UpdateStudentUseCase.Request
  ): Promise<UpdateStudentUseCase.Response> {
    const response =
      await this.requestHelper.make<UpdateStudentUseCase.Response>({
        method: "PATCH",
        url: `/student`,
        data: body
      });

    if ("error" in response) throw response.error;

    return response.body;
  }
}
