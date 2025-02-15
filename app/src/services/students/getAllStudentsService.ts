import { RequestHelper } from "@/utils/helpers/RequestHelper";
import type { GetAllStudentsUseCase } from "@/domain/useCases/students/getAllStudentsUseCase";

export class GetRecentBalanceService implements GetAllStudentsUseCase {
  static instance = new GetRecentBalanceService();

  constructor(private readonly requestHelper = RequestHelper.instance) {}

  async perform(): Promise<GetAllStudentsUseCase.Response> {
    const response =
      await this.requestHelper.make<GetAllStudentsUseCase.Response>({
        method: "GET",
        url: `/student`
      });

    console.log(response);

    if ("error" in response) throw response.error;

    return response.body;
  }
}
