import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: {
        absolute: 'Página não encontrada'
    }
}

export default function NotFound() {
    return (
        <main className="grid h-screen place-items-center">
            <div className="max-w-lg p-8">
                <h1>404</h1>
                <h2>Parece que não há nada aqui...</h2>
                <p>
                    Sua sede de conhecimento foi tão grande que quebrou o espaço-tempo, que tal se
                    voltarmos para a{' '}
                    <Link className="underline underline-offset-2" href="/">
                        Página inicial
                    </Link>
                    ?
                </p>
            </div>
        </main>
    )
}
