import { Schema } from "mongoose";

export const UserSchema=new Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    tickets:[{type:Schema.Types.ObjectId,ref:'Tickets'}]
})