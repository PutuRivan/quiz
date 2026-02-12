import React from 'react'
import { Toaster } from 'sonner'
import { RouterProvider } from "react-router/dom";
import { router } from '@/route';
import AuthProvider from './auth-provider';
import QuizProvider from './quiz-provider';

export default function Providers() {
  return (
    <>
      <AuthProvider>
        <QuizProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </QuizProvider>
      </AuthProvider>
    </>
  )
}
