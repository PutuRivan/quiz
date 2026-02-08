import React from 'react'
import { Button } from '../ui/button'

export default function Header() {
  return (
    <header className='flex justify-between items-center w-full'>
      <div>
        <h1>Quiz App</h1>
        <p>Welcome back,Username</p>
      </div>
      <Button>Logout</Button>
    </header>
  )
}