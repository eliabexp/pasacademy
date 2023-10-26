import '@/styles/not-found.scss'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Página não encontrada'
}

export default function NotFound() {
    return (
        <main>
            <h1>404</h1>
            <p>Oops, acho que você se perdeu</p>
            <p>Que tal voltarmos para a <Link href="/">Página inicial</Link>?</p>
        </main>
    )
}