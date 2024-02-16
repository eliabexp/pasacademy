import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Perfil() {
    const session = await auth()
    if (!session) redirect('/login')

    return <main></main>
}
