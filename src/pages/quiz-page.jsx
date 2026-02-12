import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useQuiz } from '@/hooks/use-quiz'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { LoaderIcon } from 'lucide-react'
import ProgressHeaderCard from '@/components/quiz/progress-header-card'
import QuestionsContainer from '@/components/quiz/questions-container'

export default function QuizPage() {
    const navigate = useNavigate()
    const {
        questions,
        currentQuestionIndex,
        answers,
        timeRemaining,
        answerQuestion,
        completeQuiz,
        isQuizComplete,
        getResults,
    } = useQuiz();

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const answeredCount = Object.keys(answers).length;

    // Navigate to results when quiz is complete
    useEffect(() => {
        if (isQuizComplete) {
            const results = getResults();

            // Calculate grade
            const percentage = parseFloat(results.percentage);
            let grade = 'F';
            let gradeMessage = 'Need More Practice';

            if (percentage >= 90) {
                grade = 'A';
                gradeMessage = 'Excellent!';
            } else if (percentage >= 80) {
                grade = 'B';
                gradeMessage = 'Great Job!';
            } else if (percentage >= 70) {
                grade = 'C';
                gradeMessage = 'Good Effort!';
            } else if (percentage >= 60) {
                grade = 'D';
                gradeMessage = 'Keep Trying!';
            }

            // Format questions for results page
            const formattedQuestions = questions.map(q => ({
                id: q.id,
                question: q.question,
                yourAnswer: answers[q.id] || 'Not answered',
                correctAnswer: q.correctAnswer,
                isCorrect: answers[q.id] === q.correctAnswer,
                category: q.category
            }));

            const resultsData = {
                totalQuestions: results.total,
                correctAnswers: results.correct,
                incorrectAnswers: results.incorrect,
                answeredQuestions: results.answered,
                unansweredQuestions: results.unanswered,
                score: percentage,
                grade,
                gradeMessage,
                questions: formattedQuestions
            };

            navigate('/results', { state: { results: resultsData } });
        }
    }, [isQuizComplete, getResults, questions, answers, navigate]);

    if (!currentQuestion) {
        return (
            <div className='grid place-items-center h-screen'>
                <LoaderIcon className='animate-spin' />
            </div>
        );
    }

    return (
        <main className='flex flex-col max-w-5xl mx-auto p-5 gap-5'>
            {/* Progress Header Card */}
            <ProgressHeaderCard
                currentQuestionIndex={currentQuestionIndex}
                questions={questions}
                answeredCount={answeredCount}
                timeRemaining={timeRemaining}
                progress={progress}
            />

            {/* Question Card */}
            <QuestionsContainer
                currentQuestion={currentQuestion}
                answerQuestion={answerQuestion}
                completeQuiz={completeQuiz}
                currentQuestionIndex={currentQuestionIndex}
                questions={questions}
            />
        </main>
    )
}
