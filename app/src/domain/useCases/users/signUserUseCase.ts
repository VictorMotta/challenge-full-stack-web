export interface SignUserUseCase {
  perform(body: SignUserUseCase.Request): Promise<SignUserUseCase.Response>;
}

export namespace SignUserUseCase {
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
