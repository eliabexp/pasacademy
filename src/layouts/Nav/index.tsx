import { Home, LibraryBig, ListTodo, Plus, Route, User, Users } from 'lucide-react'
import Menu from './Menu'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from '@/hooks/auth'

interface NavProps {
    page: string
    setPage: React.Dispatch<React.SetStateAction<string>>
}

export default function Nav({ page, setPage }: NavProps) {
    const user = useSession()

    const links = [
        {
            name: 'Início',
            url: 'inicio',
            icon: <Home />,
            iconActive: <Home fill="currentColor" />
        },
        {
            name: 'Obras',
            url: 'obras',
            icon: <LibraryBig />,
            iconActive: <LibraryBig fill="currentColor" />
        },
        {
            name: 'Comunidade',
            url: 'comunidade',
            icon: <Users />,
            iconActive: <Users fill="currentColor" />
        },
        {
            name: 'Questões',
            url: 'questoes',
            icon: <ListTodo />,
            iconActive: <ListTodo fill="currentColor" />
        },
        {
            name: user ? 'Perfil' : 'Entrar',
            url: 'perfil',
            icon: <User />,
            iconActive: <User fill="currentColor" />
        },
        {
            name: 'Criar',
            url: 'criar',
            icon: <Plus />,
            iconActive: <Plus />,
            hide: !user || !user.permissions.some((p) => ['admin', 'createContent'].includes(p))
        }
    ]

    // Set active page
    const pathName = usePathname().split('/')[1]
    useEffect(() => {
        if (links.some((l) => l.url === pathName)) setPage(pathName)
        else setPage('inicio')
    }, [pathName])

    return (
        <nav className="fixed bottom-0 z-10 flex h-14 w-full items-center bg-background md:static md:h-full md:min-h-[calc(100svh-4rem)] md:w-60 md:flex-col md:gap-1 md:px-2 md:py-8 print:hidden">
            <Menu links={links} page={page} />
        </nav>
    )
}
