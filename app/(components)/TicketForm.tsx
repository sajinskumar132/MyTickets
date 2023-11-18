"use client"
import { Select, MenuItem, FormControlLabel, Radio, RadioGroup, IconButton, CircularProgress, Alert, Snackbar } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { ticketApi } from '../(api-wrapper)/ticketApi'
import { FaEdit } from "react-icons/fa";
import { ITicket } from '../(interfaces)/globalInterface'
import { useDispatch } from 'react-redux'
import { ToggleUpdate } from '../(store)/ticketStore'
import { ToastContainer,toast  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
interface IProps {
  IsView: boolean
  id?: string
  data?: ITicket | any
  ModalVisibilityChange?:any
}
function TicketForm({ IsView, id, data,ModalVisibilityChange }: IProps) {
  const [Editable, SetEditable] = useState(IsView)
  const [Loading,SetLoading]=useState(false)
  const dispatch=useDispatch()
  const ToggleEditable = () => {
    SetEditable(!Editable)
  }
  const router = useRouter()
  const StartingTicket = {
    title: data ? data.title : "",
    description: data ? data.description : "",
    category: data ? data.category : "Task",
    priority: data ? data.priority : 'High',
    status: data ? data.status : "Open",
    progress: data ? Number(data.progress) : 0,
  }
  const [FormErrors, setFormErrors] = useState({
    title: '',
    description: '',
  });
  const [FormData, SetFormData] = useState(StartingTicket)
  const handleChange = (e: any) => {
    const value = e.target.value
    const name = e.target.name
    SetFormData({ ...FormData, [name]: value })
    setFormErrors({ ...FormErrors, [name]: '' }); 
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const errors: any = {};
    if (!FormData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!FormData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (IsView) {
      SetLoading(true)
      ticketApi.UpdateTicket(FormData,id!).then((response) => {
        if (response.status === 200) {
          toast.success('Sucessfully Updated')
          ModalVisibilityChange(false)
          dispatch(ToggleUpdate())
        }else{
          toast.error ("Something Went Wrong")
        }
      }).catch((error) => {
        if(error.status===401){
          toast.error ("Unauthorized")
          router.push('/login')
        }else{
          toast.error (error.data.message)
        }
      }).finally(()=>{
        SetLoading(false)
      })
    } else {
      SetLoading(true)
      ticketApi.NewTicket(FormData).then((response) => {
        if (response.status === 201) {
          toast.success('Sucessfully Created')
          router.push('/dashboard')
        }else{
          toast.error ("Something Went Wrong")
        }
      }).catch((error) => {
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

  }
  return (
    <div className={`h-[90vh] flex items-center justify-center ${!IsView ? 'mt-20':'' }`}>
      <ToastContainer />
      <div className=' border w-[80%] p-10 rounded-lg border-blue-500  '>
        <div className=' flex justify-between'>
          <div className=' flex  gap-3'>
            <div onClick={() => {
              if(IsView){
                ModalVisibilityChange(false)
              }else{
                router.push('/dashboard')
              }
              
            }}>
              <IoArrowBackCircleOutline className=" text-3xl cursor-pointer" />
            </div>
            <h5 className=' font-semibold text-lg max-w-lg break-words'>{IsView ? data.title : 'New Ticket'}</h5>
          </div>
          {IsView && Editable ? <div>
            <IconButton onClick={() => {
              ToggleEditable()
            }}>
              <FaEdit />
            </IconButton>
          </div> : <></>}
        </div>
        <form className=' ml-11 mt-5 flex flex-col gap-3 space-y-2' method='post' onSubmit={handleSubmit}>
          <label className=' font-semibold'>Title</label>
          <input readOnly={IsView} id="title" name="title" type='text'  value={FormData.title} onChange={handleChange} className=' w-[100%] border border-gray-400 rounded-lg outline-none px-1 py-1 text-sm' />
          {FormErrors.title && <span className="text-red-500">{FormErrors.title}</span>}
          <label className=' font-semibold'>Description</label>
          <textarea readOnly={Editable} rows={5} id="description" name="description"  value={FormData.description} onChange={handleChange} className=' w-[100%] border border-gray-400 rounded-lg outline-none px-1 py-1 text-sm' />
          {FormErrors.description && <span className="text-red-500">{FormErrors.description}</span>}
          <label className=' font-semibold'>Category</label>
          <Select
            readOnly={Editable}
            name='category'
            value={FormData.category}
            onChange={handleChange}
          >
            <MenuItem value={'Task'}>Task</MenuItem>
            <MenuItem value={'Bug'}>Bug</MenuItem>
            <MenuItem value={'Improvement'}>Improvement</MenuItem>
            <MenuItem value={'Feature'}>Feature</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
          <div className=' flex items-center justify-between'>
            <div>
              <label className=' font-semibold'>Priority</label>
              <RadioGroup
                row
                name='priority'
                value={FormData.priority}
                onChange={handleChange}
              >
                <FormControlLabel disabled={Editable} value="Highest" control={<Radio />} label="Highest" />
                <FormControlLabel disabled={Editable} value="High" control={<Radio />} label="High" />
                <FormControlLabel disabled={Editable} value="Medium" control={<Radio />} label="Medium" />
                <FormControlLabel disabled={Editable} value="Low" control={<Radio />} label="Low" />
              </RadioGroup>
            </div>
            <div>
              <label className=' font-semibold'>Status</label>
              <RadioGroup
                row
                value={FormData.status}
                name='status'
                onChange={handleChange}
              >
                <FormControlLabel disabled={Editable} value="Open" control={<Radio />} label="Open" />
                <FormControlLabel disabled={Editable} value="In Progress" control={<Radio />} label="In Progress" />
                <FormControlLabel disabled={Editable} value="On Hold" control={<Radio />} label="On Hold" />
                <FormControlLabel disabled={Editable} value="Resolved" control={<Radio />} label="Resolved" />
                <FormControlLabel disabled={Editable} value="Unable to reproduce" control={<Radio />} label="Unable to reproduce" />
              </RadioGroup>
            </div>
          </div>

          <label className=' font-semibold'>Progress
            <span className={` ml-2 px-3 py-1 ${FormData.progress <= 30 ? 'bg-red-500' : FormData.progress > 30 && FormData.progress < 60 ? ' bg-sky-500' : 'bg-green-500'} rounded-2xl text-center text-white font-bold`}>{FormData.progress} %</span>
          </label>
          <input readOnly={Editable} id="progress" name="progress" type='range' onChange={handleChange} value={FormData.progress} min={0} max={100} />
          {!Editable ?
            <div className=' flex justify-end gap-5'>
              <button className=' px-5 py-1 border border-blue-500 rounded-lg font-semibold text-blue-500' onClick={() => {
                if(IsView){
                  ModalVisibilityChange(false)
                }else{
                  router.push('/dashboard')
                }
              }}>Cancel</button>
              <button type='submit' className=' px-5 py-1 border bg-blue-500 rounded-lg font-semibold text-white'>  {Loading?<CircularProgress size={18} />:<>{IsView && !Editable ? 'Update' : 'Create'}</>}</button>
            </div> : <></>
          }
        </form>
      </div>
    </div>

  )
}

export default TicketForm
