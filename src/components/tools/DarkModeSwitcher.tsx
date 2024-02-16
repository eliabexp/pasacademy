'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function DarkModeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme()
    const darkTheme = resolvedTheme === 'dark'

    return (
        <button onClick={() => setTheme(darkTheme ? 'light' : 'dark')}>
            {darkTheme ? <Moon /> : <Sun />}
        </button>
    )
}