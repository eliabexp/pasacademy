import '@/styles/main.scss'
import Link from 'next/link'

export const metadata = {
    title: {
        absolute: 'Página não encontrada'
    }
}

export default function NotFound() {
    return (
        <main className="not-found">
            <h1>404</h1>
            <p>Oops, acho que você se perdeu</p>
            <p>Que tal voltarmos para a <Link href="/">Página inicial</Link>?</p>
        </main>
    )
}