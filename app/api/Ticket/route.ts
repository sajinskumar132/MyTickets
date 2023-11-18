import { NewTicket } from "@/app/(api-controllers)/Ticketcontrollers/ticketControllers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return await NewTicket(req);
}
