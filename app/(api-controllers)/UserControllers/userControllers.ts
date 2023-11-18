import { NextRequest, NextResponse } from "next/server"
import { hashSync } from 'bcryptjs'
import { User } from "@/app/(models)/ModelsWrapper"
import Jwt from 'jsonwebtoken'
import { validationServices } from "@/app/(services)/ValidationServices"
export const SignUp=async (req:NextRequest)=>{
    try {
        const body=await req.json()
        const {userName,email,password}=body
        const existingUser=await User.findOne({email})
        if(existingUser) return NextResponse.json({message:`user with this ${email} already exists`,data:null},{status:400})
        const encodePassword=hashSync(password)
        const newUser= new User({userName,email,password:encodePassword})
        await newUser.save()
        if(!newUser) return NextResponse.json({message:"Unable to create",data:null},{status:400})
        const token=Jwt.sign({id:newUser._id},process.env.SEACRET_KEY!,{expiresIn:'7D'})
        const UserDetails={
            id:newUser._id,
            userName:newUser.userName,
            email:newUser.email,
            token:token
        }
        return NextResponse.json({message:"Sucessfully SignUp",data:UserDetails},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error",data:null},{status:500})
    }
}

export const Login=async(req:NextRequest)=>{//Test1@123
    try {
        const body=await req.json()
        const {email,password}=body
        const existingUser=await User.findOne({email})
        if(!existingUser) return NextResponse.json({message:`user with this ${email} does not exists`,data:null},{status:400})
        const IsPasswordVerified=validationServices.PasswordVeification(password,existingUser.password)
        if(!IsPasswordVerified) return NextResponse.json({message:`InCorrect Password`,data:null},{status:400})
        const token=Jwt.sign({id:existingUser._id},process.env.SEACRET_KEY!,{expiresIn:'7D'})
        const UserDetails={
            id:existingUser._id,
            userName:existingUser.userName,
            email:existingUser.email,
            token:token
        }
        return NextResponse.json({message:"Sucessfully Login",data:UserDetails},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error",data:null},{status:500})
    }
}