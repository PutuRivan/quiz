import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { loginSchema } from '@/libs/schema'
import { toast } from 'sonner'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

      // Cek apakah ada daftar users di localStorage
      const usersData = localStorage.getItem('quizUsers')
      const users = usersData ? JSON.parse(usersData) : []

      // Cari user berdasarkan username
      const existingUser = users.find(u => u.username === userData.username)

      if (existingUser) {
        // Jika user sudah ada, cek apakah password sama
        if (existingUser.password !== userData.password) {
          throw new Error('Password salah')
        }
        // Password benar, login berhasil
        localStorage.setItem('quizUser', JSON.stringify(existingUser))
        setUser(existingUser)
        toast.success('Login berhasil')
      } else {
        // Jika user belum ada, tambahkan user baru
        users.push(userData)
        localStorage.setItem('quizUsers', JSON.stringify(users))
        localStorage.setItem('quizUser', JSON.stringify(userData))
        setUser(userData)
        toast.success('Registrasi berhasil! Anda telah login')
      }
    } catch (error) {
      console.error('Login error:', error)
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
