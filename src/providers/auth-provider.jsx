import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { loginSchema } from '@/libs/schema'
import { toast } from 'sonner'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('quizUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = ({ username, password }) => {
    setIsLoading(true)

    try {
      const result = loginSchema.safeParse({ username, password })

      if (!result.success) {
        const message = result.error.errors?.[0]?.message || 'Invalid input'
        throw new Error(message)
      }

      const userData = result.data

      localStorage.setItem('quizUser', JSON.stringify(userData))

      setUser(userData)
      toast.success('Login successful')
    } catch (error) {
      console.error('Login error:', error)

      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('quizUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
