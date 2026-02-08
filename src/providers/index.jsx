import React from 'react'
import { Toaster } from 'sonner'
import { RouterProvider } from "react-router/dom";
import { router } from '@/route';

export default function Providers({ children }) {
  return (
    <>
      {children}
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  )
}
