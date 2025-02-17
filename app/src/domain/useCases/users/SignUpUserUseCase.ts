export interface SignUpUserUseCase {
  perform(body: SignUpUserUseCase.Request): Promise<SignUpUserUseCase.Response>;
}

export namespace SignUpUserUseCase {
  export type Request = {
    name: string;
    email: string;
    password: string;
    role: "teacher" | "admin";
  };

  export type Response = string;
}
