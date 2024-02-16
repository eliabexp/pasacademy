'use client'

import { LoginMessage } from '@/layouts/Trilhas'
import { useSession } from '@/hooks/auth'

export default function Trilhas() {
    const user = useSession()
    if (!user) return <LoginMessage />

    return (
        <>
            <main className="p-4">
                <h1 className="my-4 text-2xl font-bold">As trilhas e resumos estão chegando...</h1>
                <p className="mx-4">
                    Em breve você poderá acompanhar suas próprias trilhas por aqui!
                </p>
            </main>
        </>
    )
}
