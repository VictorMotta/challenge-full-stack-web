import { RequestHelper } from "@/utils/helpers/RequestHelper";
import type { SignUserUseCase } from "@/domain/useCases/users/signUserUseCase";

export class SignInUserService implements SignUserUseCase {
  static instance = new SignInUserService();

  constructor(private readonly requestHelper = RequestHelper.instance) {}

  async perform(
    body: SignUserUseCase.Request
  ): Promise<SignUserUseCase.Response> {
    const response = await this.requestHelper.make<SignUserUseCase.Response>({
      method: "POST",
      url: `/user/sign-in`,
      data: body
    });

    console.log(response);

    if ("error" in response) throw response.error;

    return response.body;
  }
}
