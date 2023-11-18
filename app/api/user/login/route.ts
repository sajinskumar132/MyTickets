import { NextRequest } from "next/server";
import { Login } from "../../../(api-controllers)/UserControllers/userControllers";

export async function POST(req:NextRequest){
    return Login(req)
}