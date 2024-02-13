'use client'

import { LogOut } from 'lucide-react'
import { useLogout } from '@/hooks/auth'
import { useRouter } from 'next/navigation'

export function SignOut() {
    const router = useRouter()
    return (
        <button
            onClick={() => {
                useLogout()
                router.push('/')
            }}
        >
            <LogOut />
        </button>
    )
}
