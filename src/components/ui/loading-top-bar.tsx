'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const LoadingTopBar = () => {
    const [value, setValue] = useState('0')
    const pathname = usePathname()

    useEffect(() => {
        setValue('100')
        setTimeout(() => {
            setValue('0')
        }, 600)
    }, [pathname])

    return (
        <progress
            className="fixed top-0 z-20 h-0.5 w-full appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value[value='0']]:transition-none [&::-webkit-progress-value]:bg-foreground [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500"
            value={value}
            max="100"
        ></progress>
    )
}

export { LoadingTopBar }
