import { NextRequest } from "next/server";
import { GetTickets, NewTicket } from "../../(api-controllers)/Ticketcontrollers/ticketControllers";


export async function GET(req:NextRequest) {
    return await GetTickets(req)
}
