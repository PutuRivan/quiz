import Header from '@/components/home/header'
import NewQuizForm from '@/components/home/new-quiz-form'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/auth-context'
import React from 'react'
import { useNavigate } from 'react-router'
import { useQuiz } from '@/hooks/use-quiz'
import ResumeQuizDialog from '@/components/home/resume-quiz-dialog'

export default function HomePage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { resetQuiz, resumeQuiz, hasSavedQuiz, getSavedQuizInfo } = useQuiz()

    const handleResumeQuiz = () => {
        resumeQuiz()
        navigate('/quiz')
    }

    const handleStartFresh = () => {
        resetQuiz()
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <>
            <ResumeQuizDialog
                showResumeDialog={hasSavedQuiz}
                setShowResumeDialog={() => { }} // Dialog is controlled by hasSavedQuiz from useQuiz
                savedQuizInfo={getSavedQuizInfo()}
                handleStartFresh={handleStartFresh}
                handleResumeQuiz={handleResumeQuiz}
                formatTime={formatTime}
            />

            <main className='flex flex-col max-w-5xl mx-auto p-5 gap-5'>
                <Header username={user?.username} />
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
        </>
    )
}