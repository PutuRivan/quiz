import Header from '@/components/home/header'
import NewQuizForm from '@/components/home/new-quiz-form'
import SetupCard from '@/components/home/setup-card'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function HomePage() {
    return (
        <main className='flex flex-col max-w-5xl mx-auto p-5 gap-5'>
            <Header />
            <div className='grid grid-cols-3 gap-5'>
                <SetupCard title="Total Questions" value="0" />
                <SetupCard title="Minutes" value="0" />
                <SetupCard title="Difficulty" value="Easy" />
            </div>
            <Card>
                <CardContent className='space-y-4'>
                    <div className='space-y-1'>
                        <h3 className='text-xl font-bold text-start'>Start New Quiz</h3>
                        <p className='text-start'>Choose your settings and start a new quiz</p>
                    </div>
                    <NewQuizForm />
                </CardContent>
            </Card>
        </main>
    )
}