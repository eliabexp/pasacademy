'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

interface DarkModeSwitcherProps extends React.HTMLProps<HTMLButtonElement> {}

export function DarkModeSwitcher({ className }: DarkModeSwitcherProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const darkTheme = resolvedTheme === 'dark'

    return (
        <button className={className} onClick={() => setTheme(darkTheme ? 'light' : 'dark')}>
            {darkTheme ? <Moon /> : <Sun />}
        </button>
    )
}