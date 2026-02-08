import React from 'react'
import { Button } from '../ui/button'

export default function Header({ username }) {
  return (
    <header className='flex justify-between items-center w-full'>
      <div>
        <h1 className='text-2xl font-bold'>Quiz App</h1>
        <p className='text-muted-foreground'>Welcome back,{username}</p>
      </div>
      <Button>Logout</Button>
    </header>
  )
}