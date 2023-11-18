
import { Ticket,User } from "@/app/(models)/ModelsWrapper"
import { NextRequest, NextResponse } from "next/server"
import { authorizeUser } from "../MiddleWare/middleWare";
import { AuthorizationError } from "@/app/(interfaces)/globalInterface";
import { startSession } from "mongoose";

export const GetTickets=async(req:NextRequest)=>{
    try {
        const userid = await authorizeUser(req);
        const ticket = await User.findById(userid).populate('tickets');
        return NextResponse.json({ message: "Tickets", data: ticket.tickets }, { status: 200 });
    } catch (error) {
        const authorizationError = error as AuthorizationError;
        return NextResponse.json({ message: authorizationError.message,status: authorizationError.status}, { status: authorizationError.status });
    }
}
export const NewTicket=async (req:NextRequest)=>{ 
     const session=await startSession()
    try {
        session.startTransaction()
        const body = await req.json();
        const userid = await authorizeUser(req);
        const exisistingUser = await User.findById(userid!)
        if(!exisistingUser) return NextResponse.json({message:"User Not found"},{status:400})
        const { title, description, category, priority, progress,status} = body;
        const newTicket= new Ticket({title, description, category, priority, progress,status})
        exisistingUser.tickets.push(newTicket._id)
        await exisistingUser.save({session})
        await newTicket.save({session})
        return NextResponse.json({message:"TicketCreated"},{status:201})
    } catch (error) {
        const authorizationError = error as AuthorizationError;
        return NextResponse.json({ message: authorizationError.message,status: authorizationError.status}, { status: authorizationError.status });
    } finally{
        await session.commitTransaction()
    }
}

export const UpdateTicket=async(req:NextRequest,param:string)=>{
    try {
        const body = await req.json();
        const { description, category, priority, progress} = body;
        const existingTicket=await Ticket.findById(param)
        if(!existingTicket) return NextResponse.json({message:"Ticket not found"},{status:400})
        const UpdateExistingTicket=await Ticket.findByIdAndUpdate(param,{ description, category, priority, progress},{new:true})
        return NextResponse.json({message:"TicketUpdated",data:UpdateExistingTicket},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})
    }
}

export const DeleteTicket=async(param:string)=>{
    try {
        const deleteTicket=await Ticket.findByIdAndRemove(param)
        if(deleteTicket) return NextResponse.json({message:"TicketDeleted",data:null},{status:200})
        return NextResponse.json({message:"Ticket not found"},{status:400})
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})
    }
}


