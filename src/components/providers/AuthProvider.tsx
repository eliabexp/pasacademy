'use client'

import { createContext } from 'react'
export const AuthContext = createContext(null as any)

interface AuthProviderProps {
    user: any | false | null
    children: React.ReactNode
}

export default function AuthProvider({ user, children }: AuthProviderProps) {
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
