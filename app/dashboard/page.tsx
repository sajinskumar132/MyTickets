"use client"
import React, { useEffect } from 'react'
import Dashboard from '../(components)/Dashboard'
import SearchFilter from '../(components)/SearchFilter'
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

function TicketDashboard() {
    const router=useRouter()
    useEffect(() => {
        const userdetails = localStorage.getItem('userDetails');
        if (!userdetails) {
          router.push('/login');
        } 
      }, []);
    return (
            <main className='flex items-center flex-col'>
                <ToastContainer />
                <div className=' fixed z-30 w-[100vw] bg-white'>
                    <SearchFilter/>
                </div>
                <div className=' mt-36 z-0 '>
                    <Dashboard />
                </div>
            </main>
    )
}

export default TicketDashboard
