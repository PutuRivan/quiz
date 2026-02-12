import { formatTime } from '@/libs/utils'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Progress } from '../ui/progress'

export default function ProgressHeaderCard({ currentQuestionIndex, questions, answeredCount, timeRemaining, progress }) {
  return (
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
            <p className='text-2xl font-bold text-accent'>{answeredCount}</p>
          </div>

          {/* Remaining */}
          <div className='text-center'>
            <p className='text-muted-foreground text-sm mb-1'>Remaining</p>
            <p className='text-2xl font-bold text-chart-5'>{questions.length - answeredCount}</p>
          </div>

          {/* Time Left */}
          <div className='text-center'>
            <p className='text-muted-foreground text-sm mb-1'>Time Left</p>
            <p className={`text-2xl font-bold ${timeRemaining < 60 ? 'text-destructive' : 'text-foreground'}`}>
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
  )
}
