"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home({ children }:{
  children: React.ReactNode
}) {
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