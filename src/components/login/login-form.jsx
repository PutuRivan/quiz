import React from 'react'
import { Field, FieldLabel } from '../ui/field'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../libs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/auth-context'

export default function LoginForm() {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    })
    const { login, isLoading } = useAuth()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        login(data)
        navigate('/home', { replace: true })
    }

    return (
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                    type="text"
                    placeholder="Enter your username"
                    {...register("username")}
                />
                {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
            </Field>
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </Field>
            <Button
                type="submit"
                className='w-full'
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Sign In"}
            </Button>
        </form>
    )
}
