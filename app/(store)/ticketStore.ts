import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice=createSlice({
    name:"Ticket",
    initialState:{
        IsUpdate:false,
        WholeTickets:[],
        Tickets:[],
        SearchValue:'',
    },
    reducers:{
        ToggleUpdate:(state)=>{
            state.IsUpdate=!state.IsUpdate
        },
        SetTickets:(state,actions)=>{
            state.WholeTickets=actions.payload
        },
        FilterResult:(state,actions)=>{
            state.SearchValue=actions.payload
            if(actions.payload!==""){
                state.Tickets=state.WholeTickets.filter((item:any)=>item.title.includes(actions.payload))
            }else{
                state.Tickets=state.WholeTickets
            }
        }
    }
})

export const {ToggleUpdate,SetTickets,FilterResult}=ticketSlice.actions

export default ticketSlice.reducer

