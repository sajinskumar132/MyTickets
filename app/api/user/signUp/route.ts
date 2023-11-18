import { NextRequest } from "next/server";
import { Login, SignUp} from "../../../(api-controllers)/UserControllers/userControllers";

export async function POST(req:NextRequest) {
    return  SignUp(req)
}

