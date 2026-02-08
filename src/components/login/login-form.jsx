import React from 'react'
import { Field, FieldLabel } from '../ui/field'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router'

export default function LoginForm() {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/home')
    }

    return (
        <form className='space-y-5' onSubmit={handleSubmit}>
            <Field>
                <FieldLabel>Username</FieldLabel>
                <Input type="text" placeholder="Enter your username" />
            </Field>
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" placeholder="Enter your password" />
            </Field>
            <Button type="submit" className='w-full'>Sign In</Button>
        </form>
    )
}
