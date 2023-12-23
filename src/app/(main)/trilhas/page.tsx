'use client'

import { useSession } from 'next-auth/react'
import Logo from '@/components/main/Logo'

export default function Trilhas() {
    const { data, status } = useSession()
    if(status === 'unauthenticated') return (
        <>
            <header>

            </header>
            <main className="short-message">
                <h1>Trilhas</h1>
                <h2>Acesse sua conta para poder visualizar suas trilhas</h2>
                <p>Com as trilhas você pode criar rotinas de estudo, ter resumos com base nos conteúdos que você estuda e muito mais!</p>
                <a href="/login" className="button">Login</a>
            </main>
        </>
    )

    return (
        <>
            <header>
                
            </header>
            <main className="short-message">
                <h1>As trilhas e resumos estão chegando...</h1>
                <p>Em breve você poderá acompanhar suas próprias trilhas por aqui!</p>
            </main>
        </>
    )
}