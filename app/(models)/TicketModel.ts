import { Schema} from "mongoose";

export const ticketSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    priority:{type:String,required:true},
    status:{type:String,required:true},
    progress:{type:String,required:true},
},{timestamps:true})

