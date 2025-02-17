import { Request } from "express";

export type AuthenticatedRequest = Request & JWTPayload;

export type JWTPayload = {
    userId: number;
    role: string;
};
