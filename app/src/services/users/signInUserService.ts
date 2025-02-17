import { RequestHelper } from "@/utils/helpers/RequestHelper";
import type { SignInUserUseCase } from "@/domain/useCases/users/signInUserUseCase";

export class SignInUserService implements SignInUserUseCase {
  static instance = new SignInUserService();

  constructor(private readonly requestHelper = RequestHelper.instance) {}

  async perform(
    body: SignInUserUseCase.Request
  ): Promise<SignInUserUseCase.Response> {
    const response = await this.requestHelper.make<SignInUserUseCase.Response>({
      method: "POST",
      url: `/user/sign-in`,
      data: body
    });

    console.log(response);

    if ("error" in response) throw response.error;

    return response.body;
  }
}
