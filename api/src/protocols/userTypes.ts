export type CreateUserReqType = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export type SignInUserReqType = {
    email: string;
    password: string;
};

export type SignInUserResType = {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: Date;
        updated_at: Date;
    };
    token: string;
};
