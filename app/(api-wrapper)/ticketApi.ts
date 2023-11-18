import axios from "axios"
import { commonServices } from "./commonServices";

export class ticketApi{
    
    static GetTickets=async ()=>{
        try {
            const response = await axios.get('/api/Tickets',commonServices.ApiHeader())
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            return Promise.reject({status:error.response.status,data:error.response.data})
        }
    }

    static NewTicket=async (formData:any)=>{
        try {
            const response = await axios.post('/api/Ticket',formData,commonServices.ApiHeader())
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            return  Promise.reject({status:error.response.status,data:error.response.data})
        }
    }
    static UpdateTicket=async (formData:any,id:string)=>{
        try {
            const response = await axios.put(`/api/Ticket/${id}/update`,formData,commonServices.ApiHeader())
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            return  Promise.reject({status:error.response.status,data:error.response.data})
        }
    }
    static DeleteTicket=async(id:string)=>{
        try {
            const response = await axios.delete(`/api/Ticket/${id}/delete`,commonServices.ApiHeader())
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            return  Promise.reject({status:error.response.status,data:error.response.data})
        }
    }
}