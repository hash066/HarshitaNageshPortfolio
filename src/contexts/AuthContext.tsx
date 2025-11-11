import React, { createContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  display_name: string
}

interface AuthContextType {
  session: { user: User } | null
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Hardcoded credentials
const HARDCODED_EMAIL = "harshitanagesh4@gmail.com"
const HARDCODED_PASSWORD = "Ganesha123*"
const HARDCODED_USER: User = {
  id: "hardcoded-user-1",
  email: HARDCODED_EMAIL,
  display_name: "Harshita Nagesh"
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<{ user: User } | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize session from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth_session')
    if (storedAuth === 'authenticated') {
      setSession({ user: HARDCODED_USER })
      setUser(HARDCODED_USER)
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      setSession({ user: HARDCODED_USER })
      setUser(HARDCODED_USER)
      localStorage.setItem('auth_session', 'authenticated')
    } else {
      throw new Error('Invalid email or password')
    }
  }

  const signOut = async () => {
    setSession(null)
    setUser(null)
    localStorage.removeItem('auth_session')
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}