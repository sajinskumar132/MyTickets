"use client"
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { FilterResult } from '../(store)/ticketStore'

function SearchFilter() {
    const dispatch=useDispatch()
  return (
    <div className=' flex justify-center gap-5 items-center flex-wrap mt-24 mb-5'>
    <div className=' space-x-2'>
        <input placeholder='Search tickets' className=' lg:w-96 border border-gray-400 rounded-lg outline-none px-1 py-1 text-sm'
         onChange={(e)=>{
             dispatch(FilterResult(e.target.value))
        }} 
        />
    </div>
    <Link href={'dashboard/Ticket/new-ticket'} className=' bg-blue-500 text-white font-semibold px-2 py-1 rounded-lg'>New Ticket</Link>
  </div>
  )
}

export default SearchFilter
