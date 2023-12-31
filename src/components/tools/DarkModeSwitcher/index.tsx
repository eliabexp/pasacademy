'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function DarkModeSwitcher() {
    const { theme, setTheme } = useTheme()
    const darkTheme = theme === 'dark'

    return (
        <button onClick={() => setTheme(darkTheme ? 'light' : 'dark')}>
            {darkTheme ? <Moon /> : <Sun />}
        </button>
    )
}