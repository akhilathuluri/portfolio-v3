'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from './auth.service'

interface AuthContextType {
  user: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check current user on mount
    authService.getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))

    // Listen to auth changes
    const { data: { subscription } } = authService.onAuthStateChange(setUser)

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Check if user is admin whenever user changes
    if (user) {
      authService.isAdmin()
        .then(setIsAdmin)
        .catch(() => setIsAdmin(false))
    } else {
      setIsAdmin(false)
    }
  }, [user])

  const signIn = async (email: string, password: string) => {
    await authService.signInWithEmail(email, password)
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
