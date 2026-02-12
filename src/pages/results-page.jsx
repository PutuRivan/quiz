import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getGradeColor } from '@/libs/utils'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useQuiz } from '@/hooks/use-quiz'

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
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold mb-2 flex items-center justify-center gap-2'>
                            Quiz Complete! 🎉
                        </h1>
                        <p>Here's how you performed!</p>
                    </div>

                    {/* Grade Display */}
                    <div className='flex flex-col items-center mb-8'>
                        <div className={`${getGradeColor(results.grade)} w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl mb-4`}>
                            <span className='text-white text-6xl font-bold'>{results.grade}</span>
                        </div>
                        <p>{results.gradeMessage}</p>
                        <p className='font-bold text-3xl'>{results.score}%</p>
                        <p>Overall Score</p>
                    </div>

                    {/* Statistics Grid */}
                    <div className='grid grid-cols-4 gap-4 mb-6'>
                        <Card>
                            <CardContent>
                                <p className='text-3xl font-bold text-center'>{results.correctAnswers}</p>
                                <p className='text-center'>Correct</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <p className='text-3xl font-bold text-center'>{results.incorrectAnswers}</p>
                                <p className='text-center'>Incorrect</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <p className='text-3xl font-bold text-center'>{results.answeredQuestions}</p>
                                <p className='text-center'>Answered</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <p className='text-3xl font-bold text-center'>{results.unansweredQuestions}</p>
                                <p className='text-center'>Unanswered</p>
                            </CardContent>
                        </Card>
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
            <Card>
                <CardContent className='p-6'>
                    <h2 className='text-2xl font-bold mb-6'>Question Review</h2>

                    <div className='space-y-4 max-h-[500px] overflow-y-auto pr-2'>
                        {results.questions.map((q) => (
                            <div
                                key={q.id}
                                className={`p-5 rounded-lg border-2 ${q.isCorrect
                                    ? 'bg-green-50 border-green-500 dark:bg-green-950/20'
                                    : 'bg-red-50 border-red-500 dark:bg-red-950/20'
                                    }`}
                            >
                                <div className='flex items-start justify-between mb-3'>
                                    <div className='flex items-center gap-3'>
                                        <Badge
                                            variant={q.isCorrect ? 'default' : 'destructive'}
                                            className='text-sm px-3 py-1'
                                        >
                                            {q.id}
                                        </Badge>
                                        <h3 className='font-semibold text-base'>{q.question}</h3>
                                    </div>
                                    <div className='flex-shrink-0'>
                                        {q.isCorrect ? (
                                            <span className='text-green-600 text-2xl'>✓</span>
                                        ) : (
                                            <span className='text-red-600 text-2xl'>✗</span>
                                        )}
                                    </div>
                                </div>

                                <div className='ml-12 space-y-2 text-sm'>
                                    <p className='text-muted-foreground'>
                                        <span className='font-medium'>Category:</span> {q.category}
                                    </p>
                                    <p className={q.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                                        <span className='font-medium'>Your answer:</span> {q.yourAnswer}
                                    </p>
                                    {!q.isCorrect && (
                                        <p className='text-green-700 dark:text-green-400'>
                                            <span className='font-medium'>Correct answer:</span> {q.correctAnswer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
} 