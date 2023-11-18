"use client"
import { Avatar, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AuthServices } from '../(services)/AuthServices';
import { blue } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [UserDetails,SetUserDetails]=useState({
    userName:'',
    email:''
  })
  const router = useRouter();
  const open = Boolean(anchorEl);
  useEffect(()=>{
      const details=AuthServices.GetUserDetails()
      SetUserDetails(details)
  },[])
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div>
      <nav className=' bg-blue-500 w-full p-2 rounded-b-lg fixed top-0 z-50 px-10'>
        <div className=' flex justify-between items-center'>
          <h1 className=' bg-white px-2 py-1 rounded-lg font-semibold text-blue-500'>MyTickets</h1>
          <div
            className=' cursor-pointer'
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={(e:any)=>handleClick(e)}
          >
            <Avatar sx={{ bgcolor: 'white',color: blue[500]}} className=' font-bold' >{UserDetails.userName?.charAt(0)}</Avatar>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div className=' m-5'>
              <p className=' font-semibold text-center'>{UserDetails.userName}</p>
              <p className=' text-sm'>{UserDetails.email}</p>
            </div>
            <MenuItem onClick={()=>{
              router.push('/login')
            }}>Logout</MenuItem>
          </Menu>
        </div>
      </nav >
    </div >
  )
}

export default Navbar
