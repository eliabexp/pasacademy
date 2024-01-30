import { AuthContext } from '@/components/providers/AuthProvider'
import { useContext } from 'react'

export function useSession() {
    const user = useContext(AuthContext)

    return user
}

export function useLogout() {
    fetch('/api/auth', { method: 'DELETE' })
}