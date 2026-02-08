import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import React, { useState } from 'react'

export default function QuizPage() {
    // Sample state - replace with actual quiz data
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [answeredCount, setAnsweredCount] = useState(9)
    const [timeLeft, setTimeLeft] = useState(0) // in seconds

    // Sample quiz data - replace with actual data from API
    const quizData = {
        totalQuestions: 10,
        questions: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correctAnswer: 2
            }
            // Add more questions...
        ]
    }

    const totalQuestions = quizData.totalQuestions
    const remaining = totalQuestions - answeredCount
    const progress = (currentQuestion / totalQuestions) * 100

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index)
    }

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            setAnsweredCount(prev => prev + 1)
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
        }
    }

    return (
        <main className='flex flex-col max-w-5xl mx-auto p-5 gap-5'>
            {/* Progress Header Card */}
            <Card>
                <CardContent className='p-6'>
                    <div className='grid grid-cols-4 gap-6 mb-4'>
                        {/* Question Counter */}
                        <div className='text-center'>
                            <p>Question</p>
                            <p>{currentQuestion + 1}/{totalQuestions}</p>
                        </div>

                        {/* Answered */}
                        <div className='text-center'>
                            <p>Answered</p>
                            <p>{answeredCount}</p>
                        </div>

                        {/* Remaining */}
                        <div className='text-center'>
                            <p>Remaining</p>
                            <p>{remaining}</p>
                        </div>

                        {/* Time Left */}
                        <div className='text-center'>
                            <p>Time Left</p>
                            <p>{formatTime(timeLeft)}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className='space-y-2'>
                        <div className='flex justify-between items-center'>
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                </CardContent>
            </Card>

            {/* Question Card */}
            <Card>
                <CardContent className='p-8'>
                    {/* Question Header */}
                    <div className='mb-6'>
                        <div className='flex items-center gap-3 mb-4'>
                            <Badge variant='secondary' className='text-sm px-3 py-1'>
                                Question {currentQuestion + 1}
                            </Badge>
                            <Badge variant='outline' className='text-sm px-3 py-1'>
                                Multiple Choice
                            </Badge>
                        </div>
                        <h2 className='text-2xl font-bold text-foreground leading-relaxed'>
                            {quizData.questions[0]?.question || "Loading question..."}
                        </h2>
                    </div>

                    {/* Answer Options */}
                    <div className='space-y-3 mb-8'>
                        {quizData.questions[0]?.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${selectedAnswer === index
                                    ? 'border-primary bg-primary/10 shadow-md'
                                    : 'border-border hover:border-primary/50 bg-card'
                                    }`}
                            >
                                <div className='flex items-center gap-4'>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${selectedAnswer === index
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-muted-foreground text-muted-foreground'
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className={`text-lg ${selectedAnswer === index ? 'font-semibold' : ''
                                        }`}>
                                        {option}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex flex-col items-center gap-4 pt-6 border-t'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <span className='text-lg'>💡</span>
                            <span>Select an answer to automatically proceed to the next question</span>
                        </div>

                        <Button
                            onClick={handleNextQuestion}
                            size='lg'
                        >
                            Complete Quiz Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
