import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { tokenUnauthorizedError } from "errors";
import { caseInsensitiveObject } from "utils";
import { AuthenticatedRequest, JWTPayload } from "protocols/authenticationTypes";

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
        const { userId, role } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        req.userId = userId;
        req.role = role;

        return next();
    } catch (err) {
        return generateUnauthorizedResponse(res);
    }
}

function generateUnauthorizedResponse(res: Response) {
    res.status(httpStatus.UNAUTHORIZED).send(tokenUnauthorizedError());
}
