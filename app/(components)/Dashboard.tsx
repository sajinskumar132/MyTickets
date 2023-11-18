"use client"
import React, { useEffect, useState } from 'react'
import TicketCard from './TicketCard'
import { ticketApi } from '../(api-wrapper)/ticketApi'
import { ITicket } from '../(interfaces)/globalInterface'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../(store)/rootStore'
import TicketForm from './TicketForm'
import { Backdrop, CircularProgress, Dialog, Stack, Typography } from '@mui/material'
import { FilterResult, SetTickets } from '../(store)/ticketStore'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function Dashboard() {
  const IsUpdate = useSelector((state: RootState) => state.ticket.IsUpdate)
  const Ticket = useSelector((state: RootState) => state.ticket.Tickets)
  const SearchResult = useSelector((state: RootState) => state.ticket.SearchValue)
  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const [Loading, SetLoading] = useState(false)
  const [SelectedDetails, SetSelectedDetails] = useState({
    id: '',
    data: {}
  })
  useEffect(() => {
    getAllTickets()
  }, [IsUpdate])

  function getAllTickets() {
    SetLoading(true)
    ticketApi.GetTickets().then((response) => {
      dispatch(SetTickets(response.data))
      dispatch(FilterResult(SearchResult))
    }).catch((error) => {
      if (error.status === 401) {
        toast.error("Unauthorized")
        router.push('/login')
      } else {
        toast.error(error.data.message)
      }
    }).finally(() => {
      SetLoading(false)
    })
  }

  const HandleVsibility = (visibility: boolean) => {
    setOpen(visibility)
  }
  return (
    <>
      <ToastContainer />
      <>
        <div className=' flex justify-center flex-wrap gap-5 mt-10 h-[80vh] overflow-y-auto overflow-x-hidden '>
          {Ticket.map((item: ITicket, index: number) => (
            <div key={item._id}
              onClick={() => {
                SetSelectedDetails({ ...SelectedDetails, ['id']: item._id, ['data']: item })
              }}>
              <TicketCard data={item} ModalVisibility={HandleVsibility} />
            </div>
          ))}
          <>
            {open ? <Dialog
              maxWidth={'xl'}
              open={open}
              onClose={() => HandleVsibility(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <TicketForm IsView={true} id={SelectedDetails.id} data={SelectedDetails.data} ModalVisibilityChange={HandleVsibility} />
            </Dialog> : <></>}
          </>
        </div>
      </>
      <Backdrop
        sx={{
          background: 'transparent',
          color: "#3b82f6",
          opacity: "0",  
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={Loading}
      >
        <Stack gap={1} justifyContent="center" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography>Loading...</Typography>
        </Stack>
      </Backdrop>
    </>
  )
}

export default Dashboard
