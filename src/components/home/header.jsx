import React from 'react'
import { Button } from '../ui/button'
import { useAuth } from '@/context/auth-context'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className='flex justify-between items-center w-full'>
      <div>
        <h1 className='text-2xl font-bold'>Quiz App</h1>
        <p className='text-muted-foreground'>Welcome back, {user?.username}</p>
      </div>
      <Button onClick={logout}>Logout</Button>
    </header>
  )
}