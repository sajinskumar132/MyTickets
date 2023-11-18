"use client"
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TiTicket } from 'react-icons/ti';
import Home from '../page';
import { authApi } from '../(api-wrapper)/authApi';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
function Loginpage() {
  const router = useRouter();
  const [Loading,SetLoading]=useState(false)
  const [FormData, SetFormData] = useState({
    email: '',
    password: '',
  });
  const [FormErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    SetFormData({ ...FormData, [name]: value });
    setFormErrors({...FormErrors, [name]: ''})
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: any = {};
    if (!FormData.email) {
      errors.email = 'Email is required';
    } 
    // else if (!/\S+@\S+\.\S+/.test(FormData.email)) {
    //   errors.email = 'Invalid email address';
    // }

    if (!FormData.password) {
      errors.password = 'Password is required';
    } else if (FormData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    LoginUser();
  };

  const LoginUser = () => {
    SetLoading(true)
    const RequestData = {
      email: FormData.email,
      password: FormData.password,
    };

    authApi.UserLogin(RequestData)
      .then(() => {
        return router.push('/dashboard');
      })
      .catch((error:any) => {
        toast.error(error.data.message)
      }).finally(()=>{
        SetLoading(false)
      });
  };

  return (
    <Home>
      <main>
        <div className='h-screen flex items-center justify-center'>
        <ToastContainer/>
          <div className='min-w-[350px] lg:min-w-[400px] p-5 border rounded-lg bg-white'>
            <div className='flex justify-center items-center gap-1'>
              <TiTicket className='text-blue-500 text-3xl' />
              <p className='text-blue-500 font-semibold'>MyTickets</p>
            </div>
            <form method='post' onSubmit={onSubmit} className='flex flex-col gap-3 py-3'>
              <label>Email</label>
              <input
                id='email'
                name='email'
                placeholder='Enter your email'
                onChange={handleOnChange}
                className={`border border-gray-300 outline-none p-1 rounded-lg text-sm ${FormErrors.email ? 'border-red-500' : ''}`}
                type='text'
              />
              {FormErrors.email && <span className='text-red-500'>{FormErrors.email}</span>}
              <label>Password</label>
              <input
                id='password'
                name='password'
                placeholder='Enter your password'
                onChange={handleOnChange}
                className={`border border-gray-300 outline-none p-1 rounded-lg text-sm ${FormErrors.password ? 'border-red-500' : ''}`}
                type='password'
              />
              {FormErrors.password && <span className='text-red-500'>{FormErrors.password}</span>}
              <button type='submit' className='bg-blue-500 text-white rounded-lg p-1'>
              {Loading?<CircularProgress size={18} />:'Login'}  
              </button>
            </form>
            <p className='text-sm text-center p-2'>
              New User ? <Link href={'/signUp'} className='underline text-blue-500'>Sign Up</Link>
            </p>
          </div>
        </div>
      </main>
    </Home>
  );
}

export default Loginpage;
