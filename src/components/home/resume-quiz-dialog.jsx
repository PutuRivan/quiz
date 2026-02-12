import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog'

export default function ResumeQuizDialog({
  showResumeDialog,
  setShowResumeDialog,
  savedQuizInfo,
  handleStartFresh,
  handleResumeQuiz,
  formatTime
}) {
  return (
    <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resume Quiz?</AlertDialogTitle>
          <AlertDialogDescription className='space-y-2'>
            <p>You have an unfinished quiz. Would you like to resume where you left off?</p>
            {savedQuizInfo && (
              <div className='mt-4 p-4 bg-muted rounded-lg space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Progress:</span>
                  <span>Question {savedQuizInfo.currentQuestion} of {savedQuizInfo.totalQuestions}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Answered:</span>
                  <span>{savedQuizInfo.answered} questions</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Time Remaining:</span>
                  <span>{formatTime(savedQuizInfo.timeRemaining)}</span>
                </div>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleStartFresh}>
            Start Fresh
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleResumeQuiz}>
            Resume Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}