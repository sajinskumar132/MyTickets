import { UpdateTicket } from "@/app/(api-controllers)/Ticketcontrollers/ticketControllers";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
    return await UpdateTicket(req,route.params.id);
}