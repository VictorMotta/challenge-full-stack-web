import { RequestHelper } from "@/utils/helpers/RequestHelper";
import type { SignUpUserUseCase } from "@/domain/useCases/users/SignUpUserUseCase";

export class SignUpUserService implements SignUpUserUseCase {
  static instance = new SignUpUserService();

  constructor(private readonly requestHelper = RequestHelper.instance) {}

  async perform(
    body: SignUpUserUseCase.Request
  ): Promise<SignUpUserUseCase.Response> {
    const response = await this.requestHelper.make<SignUpUserUseCase.Response>({
      method: "POST",
      url: `/user/sign-up`,
      data: body
    });

    console.log(response);

    if ("error" in response) throw response.error;

    return response.body;
  }
}
