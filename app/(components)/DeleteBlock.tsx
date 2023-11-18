import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { ticketApi } from '../(api-wrapper)/ticketApi';
import { CircularProgress, IconButton } from '@mui/material';
import { ToggleUpdate } from '../(store)/ticketStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
function DeleteBlock({id}:{id:string}) {
  const dispatch=useDispatch()
  const router=useRouter()
  const [Loading,SetLoading]=useState(false)
  const RemoveTicket=()=>{
    SetLoading(true)
    ticketApi.DeleteTicket(id).then(()=>{
      toast.success('Sucessfully Deleted')
      dispatch(ToggleUpdate())
    }).catch((error:any)=>{
      if(error.status===401){
        toast.error ("Unauthorized")
        router.push('/login')
      }else{
        toast.error (error.data.message)
      }
    }).finally(()=>{
      SetLoading(false)
    })
  }
  return (
    <div className='float-right' >
      <IconButton aria-label="delete" onClick={()=>{
         RemoveTicket()
      }}>
        {Loading?<CircularProgress size={18} />:<AiOutlineClose className={' text-red-600'}/>}
      </IconButton>
    </div>
  )
}

export default DeleteBlock
