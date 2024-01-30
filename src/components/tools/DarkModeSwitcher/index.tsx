'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function DarkModeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme()
    const darkTheme = resolvedTheme === 'dark'

    return (
        <button onClick={() => setTheme(darkTheme ? 'light' : 'dark')}>
            {darkTheme ? <Moon /> : <Sun />}
        </button>
    )
}