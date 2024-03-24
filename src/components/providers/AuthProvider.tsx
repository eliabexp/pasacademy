'use client'

import { createContext } from 'react'
import type { User } from '@/lib/auth'

interface AuthProviderProps {
    user: User | null
    children: React.ReactNode
}

export const AuthContext = createContext<User | null>(null)

export default function AuthProvider({ user, children }: AuthProviderProps) {
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
