import React from 'react'
import { Toaster } from 'sonner'
import { RouterProvider } from "react-router/dom";
import { router } from '@/route';
import AuthProvider from './auth-provider';

export default function Providers() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </>
  )
}
