"use client"
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { authApi } from '../(api-wrapper)/authApi'
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { TiTicket } from 'react-icons/ti';
function SignUpPage() {
    const router = useRouter();
    const [Loading, SetLoading] = useState(false)
    const [FormData, SetFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [FormErrors, setFormErrors] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        SetFormData({ ...FormData, [name]: value });
        setFormErrors({ ...FormErrors, [name]: '' }); 
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors: any = {};
        if (!FormData.userName) {
            errors.userName = 'User Name is required';
        }
        if (!FormData.email) {
            errors.email = 'Email is required';
        }
        if (FormData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (FormData.password !== FormData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        CreateNewUser();
    }

    const CreateNewUser = async () => {
        SetLoading(true)
        const RequestData = {
            userName: FormData.userName,
            email: FormData.email,
            password: FormData.confirmPassword,
        };

        authApi.UserSignUp(RequestData).then(() => {
            return router.push('/dashboard');
        }).catch((error: any) => {
            toast.error(error.data.message)
        }).finally(() => {
            SetLoading(false)
        });
    }

    return (
        <main>
            <ToastContainer />
            <div className='h-screen flex items-center justify-center'>
                <div className='min-w-[350px] lg:min-w-[400px] p-5 border rounded-lg bg-white'>
                    <div className='flex justify-center items-center gap-1'>
                        <TiTicket className='text-blue-500 text-3xl' />
                        <p className='text-blue-500 font-semibold'>MyTickets</p>
                    </div>
                    <form method='post' onSubmit={onSubmit} className='flex flex-col gap-3 py-3'>
                        <label>User Name</label>
                        <input
                            id="userName"
                            name='userName'
                            placeholder='Enter your UserName'
                            onChange={handleOnChange}
                            className={`border border-gray-300 outline-none p-1 rounded-lg text-sm ${FormErrors.userName ? 'border-red-500' : ''}`}
                            type='text'
                        />
                        {FormErrors.userName && <span className="text-red-500">{FormErrors.userName}</span>}
                        <label>Email</label>
                        <input
                            id="email"
                            name='email'
                            placeholder='Enter your email'
                            onChange={handleOnChange}
                            className={`border border-gray-300 outline-none p-1 rounded-lg text-sm ${FormErrors.email ? 'border-red-500' : ''}`}
                            type='text'
                        />
                        {FormErrors.email && <span className="text-red-500">{FormErrors.email}</span>}
                        <label>Password</label>
                        <input
                            id="password"
                            name="password"
                            placeholder='Enter your password'
                            onChange={handleOnChange}
                            className={`border border-gray-300  outline-none p-1 rounded-lg text-sm ${FormErrors.password ? 'border-red-500' : ''}`}
                            type='password'
                        />
                        {FormErrors.password && <span className="text-red-500">{FormErrors.password}</span>}
                        <label>Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder='Enter your Confirm Password'
                            onChange={handleOnChange}
                            className={`border border-gray-300  outline-none p-1 rounded-lg text-sm ${FormErrors.confirmPassword ? 'border-red-500' : ''}`}
                            type='password'
                        />
                        {FormErrors.confirmPassword && <span className="text-red-500">{FormErrors.confirmPassword}</span>}
                        <button type='submit' className='bg-blue-500 text-white rounded-lg p-1'>{Loading ? <CircularProgress size={18} /> : 'Sign Up'}</button>
                        <p className='text-sm text-center p-2'>
                            Already exists User ? <Link href={'/login'} className='underline text-blue-500'>Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default SignUpPage;