import mongoose, { model } from "mongoose"
import { ticketSchema } from "./TicketModel"
import { UserSchema } from "./UserModel"

mongoose.connect(process.env.DATABASE_URL!)
mongoose.Promise=global.Promise

const Ticket=mongoose.models.Tickets || model('Tickets',ticketSchema)
const User=mongoose.models.Users || model('Users', UserSchema)

export {Ticket,User}