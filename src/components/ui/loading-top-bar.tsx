'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

const LoadingTopBar = () => {
    const [value, setValue] = useState('0')
    const pathname = usePathname()
    const previousPathname = useRef(pathname)

    // disable loading bar between these paths
    const mainPaths = ['/inicio', '/obras', '/questoes', '/perfil']

    useEffect(() => {
        if (mainPaths.includes(pathname) && mainPaths.includes(previousPathname.current)) return

        setValue('100')
        setTimeout(() => {
            setValue('0')
        }, 600)

        previousPathname.current = pathname
    }, [pathname])

    return (
        <progress
            className="fixed top-0 z-20 h-0.5 w-full appearance-none bg-transparent [&::-moz-progress-bar]:bg-foreground [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value[value='0']]:transition-none [&::-webkit-progress-value]:bg-foreground [&::-webkit-progress-value]:duration-500"
            value={value}
            max="100"
        ></progress>
    )
}

export { LoadingTopBar }
