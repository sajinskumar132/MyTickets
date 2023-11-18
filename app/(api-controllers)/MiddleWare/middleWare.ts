import { AuthorizationError } from "@/app/(interfaces)/globalInterface";
import { validationServices } from "@/app/(services)/ValidationServices";
import { NextRequest, NextResponse } from "next/server";

export const authorizeUser = async (req: NextRequest) => {
    try {
        const token = req.headers.get("Authorization")?.split(' ')[1];

        if (!token) throw { status: 401, message: "Unauthorized" };

        const userid = validationServices.TokenValidation(token!);

        if (!userid) throw { status: 401, message: "Unauthorized" };

        return userid;
    } catch (error) {
        const authorizationError = error as AuthorizationError;
        throw { status: authorizationError.status || 500, message: authorizationError.message || "Internal Server Error" };
    }
};