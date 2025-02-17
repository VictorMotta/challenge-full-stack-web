export interface SignInUserUseCase {
  perform(body: SignInUserUseCase.Request): Promise<SignInUserUseCase.Response>;
}

export namespace SignInUserUseCase {
  export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };

  export type Request = {
    email: string;
    password: string;
  };

  export type Response = {
    user: User;
    token: string;
  };
}
