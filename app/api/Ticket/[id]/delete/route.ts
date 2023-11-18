import { DeleteTicket } from "@/app/(api-controllers)/Ticketcontrollers/ticketControllers";
import { NextRequest } from "next/server";


export async function DELETE(_:NextRequest,route: { params: { id: string } }){
    return await DeleteTicket(route.params.id)
}