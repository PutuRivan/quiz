import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getGradeColor } from '@/libs/utils'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useQuiz } from '@/context/quiz-context'
import QuestionsReviewContainer from '@/components/result/questions-review-container'
import StatsCard from '@/components/result/stats-card'

export default function ResultsPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const results = location.state?.results
    const { resetQuiz } = useQuiz()

    // Redirect to home if no results
    useEffect(() => {
        if (!results) {
            navigate('/home')
        }
    }, [results, navigate])

    const handleRetakeQuiz = () => {
        resetQuiz()
        navigate('/home')
    }

    const handleExit = () => {
        resetQuiz()
        navigate('/home')
    }

    if (!results) {
        return (
            <main className='flex flex-col max-w-5xl mx-auto p-5 gap-5'>
                <Card>
                    <CardContent className='p-8 text-center'>
                        <p>Loading results...</p>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className='flex flex-col max-w-5xl mx-auto p-5 gap-5'>
            {/* Results Card */}
            <Card>
                <CardContent className='p-8'>
                    {/* Header */}
                    <div className='text-center mb-8 text-card-foreground'>
                        <h1 className='text-3xl font-bold mb-2 flex items-center justify-center gap-2'>
                            Quiz Complete!
                        </h1>
                        <p>Here's how you performed!</p>
                    </div>

                    {/* Grade Display */}
                    <div className='flex flex-col items-center mb-8'>
                        <div className={`${getGradeColor(results.grade)} w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl mb-4`}>
                            <span className='text-card-foreground text-6xl font-bold'>{results.grade}</span>
                        </div>
                        <p>{results.gradeMessage}</p>
                        <p className='font-bold text-3xl text-center text-accent'>{results.score}%</p>
                        <p className='text-card-foreground'>Overall Score</p>
                    </div>

                    {/* Statistics Grid */}
                    <div className='grid grid-cols-4 gap-4 mb-6'>
                        <StatsCard value={results.correctAnswers} label='Correct' />
                        <StatsCard value={results.incorrectAnswers} label='Incorrect' />
                        <StatsCard value={results.answeredQuestions} label='Answered' />
                        <StatsCard value={results.unansweredQuestions} label='Unanswered' />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-center gap-4'>
                        <Button
                            onClick={handleRetakeQuiz}
                            size='lg'
                        >
                            🔄 Take Another Quiz
                        </Button>
                        <Button
                            onClick={handleExit}
                            variant='outline'
                            size='lg'
                        >
                            Exit
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Question Review Section */}
            <QuestionsReviewContainer results={results} />
        </main >
    )
} 