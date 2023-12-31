'use client'

import { LogOut } from 'lucide-react'
import { useLogout } from '@/hooks/auth'

export default function DarkModeSwitcher() {
    return (
        <button onClick={() => useLogout()}>
            <LogOut />
        </button>
    )
}