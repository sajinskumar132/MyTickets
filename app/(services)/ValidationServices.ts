import { compareSync } from "bcryptjs"
import Jwt from 'jsonwebtoken'
export class validationServices{
    static PasswordVeification(password:string,encryptedPassword:string){
        return compareSync(password,encryptedPassword)
    }

    static TokenValidation(token:string){
        let userId
        Jwt.verify(token,process.env.SEACRET_KEY!,((err, decoded:any)=>{
            if(!err){
                userId=decoded.id
            }
        }))
        return userId
    }
}