'use client'

import '@/styles/trilhas.scss'
import { useSession } from 'next-auth/react'
import Logo from '@/components/main/Logo'

export default function Trilhas() {
    const { data, status } = useSession()

    return (
        <>
        <header>
            <Logo/>
        </header>
        {status === 'authenticated' ? (
            <main>
                <h1>Trilhas</h1>
            </main>
        ) : (
            <main className="notsigned">
                <h1>Trilhas</h1>
                <h2>Acesse sua conta para poder visualizar suas trilhas</h2>
                <p>Com as trilhas você pode criar rotinas de estudo, ter resumos com base nos conteúdos que você estuda e muito mais!</p>
                <a href="/login">Login</a>
            </main>
        )}
        </>
    )
}