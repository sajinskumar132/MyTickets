import React, { useEffect } from 'react'
import DeleteBlock from './DeleteBlock'
import { ITicket } from '../(interfaces)/globalInterface'
import { FcParallelTasks } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
interface IProps{
  data: ITicket 
  ModalVisibility:any
}
function TicketCard({ data,ModalVisibility }:IProps) {
  return (
    <div className=' border rounded-lg  max-w-xl cursor-pointer hover:shadow-lg min-w-[300px] h-[250px] space-y-3 flex flex-col justify-between'>
      <div>
        <DeleteBlock id={data._id} />
        <div className=' m-5 space-y-3' onClick={()=>{
          ModalVisibility(true)
        }}>
          <p className=' font-semibold text-lg max-w-xl break-words'>{data.title} <span className=' px-2 py-1 bg-gray-300 rounded-lg text-sm font-normal'>{data.category}</span></p>
          <div className=' flex gap-2 items-center'>
            <FcParallelTasks className={'text-2xl'} />
            <p>{data.priority}</p>
          </div>
          <div className=' flex gap-2 items-center'>
            <FcClock className={'text-2xl'} />
            <h1>{data.updatedAt.replace('T', ' ').replace('Z', ' ')}</h1>
          </div>
        </div>
      </div>
      <div className=' flex justify-between items-center' onClick={()=>{
          ModalVisibility(true)
        }}>
        <p className={` px-5 py-2 rounded-bl-xl  rounded-tr-full ${Number(data.progress) <= 30 ? 'bg-red-500' : Number(data.progress) > 30 && Number(data.progress) < 60 ? ' bg-sky-500' : 'bg-green-500'} text-center font-semibold text-white`}>{data.progress}%</p>
        <p className={` px-2 py-1  rounded-lg text-white text-sm mr-3
        ${data.status === "Open" ? 'bg-blue-500' : data.status === "In Progress" ? ' bg-orange-500' : data.status === "Resolved" ? ' bg-green-500' : 'bg-red-500'}`}>
          {data.status}</p>
      </div>
    </div>
  )
}

export default TicketCard
