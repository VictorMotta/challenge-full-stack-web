import { RequestHelper } from "@/utils/helpers/RequestHelper";
import type { CreateStudentUseCase } from "@/domain/useCases/students/createStudentUseCase";

export class CreateStudentService implements CreateStudentUseCase {
  static instance = new CreateStudentService();

  constructor(private readonly requestHelper = RequestHelper.instance) {}

  async perform(
    body: CreateStudentUseCase.Request
  ): Promise<CreateStudentUseCase.Response> {
    const response =
      await this.requestHelper.make<CreateStudentUseCase.Response>({
        method: "POST",
        url: `/student`,
        data: body
      });

    if ("error" in response) throw response.error;

    return response.body;
  }
}
