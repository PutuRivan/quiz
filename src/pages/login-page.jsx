import LoginForm from '@/components/login/login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/auth-context'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function LoginPage() {
    const { user, isLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // Redirect to home if already logged in
        if (!isLoading && user) {
            navigate('/home', { replace: true })
        }
    }, [user, isLoading, navigate])

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render login form if user is authenticated (will redirect)
    if (user) {
        return null
    }

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

