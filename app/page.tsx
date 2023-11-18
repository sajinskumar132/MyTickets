"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Home = ({ children }:any) => {
  const router = useRouter();

  useEffect(() => {
    const userdetails = localStorage.getItem('userDetails');
    if (!userdetails) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [router]);
  return <main>{children}</main>;
}

export default Home;