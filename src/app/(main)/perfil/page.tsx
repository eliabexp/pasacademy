import auth from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Perfil() {
    const user = await auth()
    if (!user) redirect('/login')

    return <main></main>
}
