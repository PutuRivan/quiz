import LoginForm from '@/components/login/login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function LoginPage() {
    return (
        <main className='grid place-items-center h-screen'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold'>
                        Quiz App
                    </CardTitle>
                    <CardDescription className='text-center text-md'>
                        Test your knowledge and have fun!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </main>
    )
}
