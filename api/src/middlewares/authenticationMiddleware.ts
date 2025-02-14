import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { unauthorizedError } from "errors";
import { caseInsensitiveObject } from "utils";

export async function authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const headersNormalized = caseInsensitiveObject(req.headers, (key) => key.toLowerCase());

    const authHeaderRaw = headersNormalized["authorization"];
    const authHeader = Array.isArray(authHeaderRaw) ? authHeaderRaw[0] : authHeaderRaw;

    if (!authHeader) return generateUnauthorizedResponse(res);

    const token = authHeader.split(" ")[1];
    if (!token) return generateUnauthorizedResponse(res);

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        req.userId = userId;

        return next();
    } catch (err) {
        return generateUnauthorizedResponse(res);
    }
}

function generateUnauthorizedResponse(res: Response) {
    res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};
