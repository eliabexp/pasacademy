import BackArrow from '@/components/nav/BackArrow'
import Profile from '@/components/main/Profile'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Perfil() {
    const session = await auth()
    if(!session || !session.user.registered) redirect('/login')

    return (
        <>
            <header>
                <BackArrow />
                <h1 className='tab-title'>Perfil</h1>
            </header>
            <main>
                <Profile user={session.user} />
                <nav>
                    <button>Publicações</button>
                    <button>Salvos</button>
                    <button>Curtidos</button>
                </nav>
            </main>
        </>
    )
}