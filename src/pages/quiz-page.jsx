import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { formatTime } from '@/libs/utils'
import { useQuiz } from '@/hooks/use-quiz'

export default function QuizPage() {
    const {
        questions,
        currentQuestionIndex,
        answers,
        timeRemaining,
        answerQuestion,
        completeQuiz,
    } = useQuiz();
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const answeredCount = Object.keys(answers).length;

    if (!currentQuestion) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-white text-xl">Loading question...</div>
            </div>
        );
    }

    return (
        <main className='flex flex-col max-w-5xl mx-auto p-5 gap-5'>
            {/* Progress Header Card */}
            <Card>
                <CardContent className='p-6'>
                    <div className='grid grid-cols-4 gap-6 mb-4'>
                        {/* Question Counter */}
                        <div className='text-center'>
                            <p className='text-muted-foreground text-sm mb-1'>Question</p>
                            <p className='text-2xl font-bold'> {currentQuestionIndex + 1}/{questions.length}</p>
                        </div>

                        {/* Answered */}
                        <div className='text-center'>
                            <p className='text-muted-foreground text-sm mb-1'>Answered</p>
                            <p className='text-2xl font-bold text-green-600'>{answeredCount}</p>
                        </div>

                        {/* Remaining */}
                        <div className='text-center'>
                            <p className='text-muted-foreground text-sm mb-1'>Remaining</p>
                            <p className='text-2xl font-bold text-blue-600'>{questions.length - answeredCount}</p>
                        </div>

                        {/* Time Left */}
                        <div className='text-center'>
                            <p className='text-muted-foreground text-sm mb-1'>Time Left</p>
                            <p className={`text-2xl font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-foreground'}`}>
                                {formatTime(timeRemaining)}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className='space-y-2'>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm font-medium'>Progress</span>
                            <span className='text-sm font-medium'>{Math.round(progress)}%</span>
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
                                Question {currentQuestionIndex + 1}
                            </Badge>
                            <Badge variant='outline' className='text-sm px-3 py-1'>
                                {currentQuestion.category}
                            </Badge>
                            <Badge variant='outline' className='text-sm px-3 py-1 capitalize'>
                                {currentQuestion.difficulty}
                            </Badge>
                        </div>
                        <h2 className='text-2xl font-bold text-foreground leading-relaxed'>
                            {currentQuestion.question}
                        </h2>
                    </div>

                    {/* Answer Options */}
                    <div className='flex flex-col gap-5'>
                        {currentQuestion.allAnswers.map((option, index) => (
                            <Button
                                key={index}
                                variant='outline'
                                onClick={() => answerQuestion(currentQuestion.id, option)}
                                className='w-full h-16 text-lg font-medium text-start justify-start'
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span>
                                        {option}
                                    </span>
                                </div>
                            </Button>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex flex-col items-center gap-4 pt-6 border-t'>
                        <div className="text-center">
                            <p className="text-foreground text-sm">
                                💡 Select an answer to automatically proceed to the next question
                            </p>
                        </div>

                        {/* Emergency Complete Button */}
                        {currentQuestionIndex === questions.length - 1 && (
                            <div className="mt-6 text-center">
                                <Button
                                    onClick={completeQuiz}
                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg"
                                >
                                    Complete Quiz Now
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
