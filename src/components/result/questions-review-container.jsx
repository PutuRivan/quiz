import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function QuestionsReviewContainer({ results }) {
  return (
    <Card>
      <CardContent className='p-6'>
        <h2 className='text-2xl font-bold mb-6'>Question Review</h2>

        <div className='space-y-4 max-h-125 overflow-y-auto pr-2'>
          {results.questions.map((q) => (
            <div
              key={q.id}
              className={`p-5 rounded-lg border-2 ${q.isCorrect
                ? 'bg-accent/30 border-accent'
                : 'bg-destructive/30 border-destructive'
                }`}
            >
              <div className='flex items-start justify-between mb-3'>
                <div className='flex items-center gap-3'>
                  <Badge
                    variant='default'
                    className='text-sm px-3 py-1'
                  >
                    {q.id + 1}
                  </Badge>
                  <h3 className='font-semibold text-base'>{q.question}</h3>
                </div>
                <div className='shrink-0'>
                  {q.isCorrect ? (
                    <span className='text-accent text-2xl'>✓</span>
                  ) : (
                    <span className='text-destructive text-2xl'>✗</span>
                  )}
                </div>
              </div>

              <div className='ml-12 space-y-2 text-sm'>
                <p className='text-muted-foreground'>
                  <span className='font-medium'>Category:</span> {q.category}
                </p>
                <p className={q.isCorrect ? 'text-accent' : 'text-destructive'}>
                  <span className='font-medium'>Your answer:</span> {q.yourAnswer}
                </p>
                {!q.isCorrect && (
                  <p className='text-accent'>
                    <span className='font-medium'>Correct answer:</span> {q.correctAnswer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
