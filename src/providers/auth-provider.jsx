import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { useNavigate } from 'react-router'

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
      const validateUser = loginSchema.safeParse({ username, password })
      if (!validateUser.success) {
        throw new Error(validateUser.error.errors[0].message)
      }

      const userData = validateUser.data
      localStorage.setItem('quizUser', JSON.stringify(userData))

      setUser(userData)

    } catch (error) {

      setError(error.message)
      return false

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
