import { AuthContext } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export function useSession() {
    const user = useContext(AuthContext)

    return user
}

export function useLogout() {
    fetch('/api/auth/logout', { method: 'DELETE' })

    useRouter().push('/login')
}