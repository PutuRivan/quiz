import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function QuestionsContainer({ currentQuestion, answerQuestion, completeQuiz, currentQuestionIndex, questions }) {
  return (
    <Card>
      <CardContent className='p-8'>
        {/* Question Header */}
        <div className='mb-6'>
          <div className='flex items-center gap-3 mb-4'>
            <Badge variant='secondary' className='text-xl font-bold px-3 py-1'>
              Question {currentQuestionIndex + 1}
            </Badge>
            <Badge variant='outline' className='text-md px-3 py-1'>
              {currentQuestion.category}
            </Badge>
            <Badge variant='outline' className='text-md px-3 py-1 capitalize'>
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
                <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
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
                className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg"
              >
                Complete Quiz Now
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
