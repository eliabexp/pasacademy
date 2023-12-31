'use client'

import { Home, LibraryBig, ListTodo, Plus, Route, User, Users } from 'lucide-react'
import { useEffect, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { LayoutContext } from '@/app/(main)/layout'
import NavButton from '@/components/ui/NavButton'
import { useSession } from '@/hooks/auth'

interface LinksList {
    name: string
    url: string
    icon: React.ReactNode
    iconActive: React.ReactNode
}

export default function Nav() {
    const { theme } = useTheme()
    const { page, setPage } = useContext(LayoutContext)
    const user = useSession()

    const fillColor = theme === 'dark' ? '#fff' : '#000'

    const links: LinksList[] = [
        {
            name: 'Início',
            url: 'inicio',
            icon: <Home />,
            iconActive: <Home fill={fillColor} />
        },
        {
            name: 'Obras',
            url: 'obras',
            icon: <LibraryBig />,
            iconActive: <LibraryBig fill={fillColor} />
        },
        {
            name: 'Questões',
            url: 'questoes',
            icon: <ListTodo />,
            iconActive: <ListTodo fill={fillColor} />
        },
        {
            name: 'Trilhas',
            url: 'trilhas',
            icon: <Route />,
            iconActive: <Route fill={fillColor} />
        },
        {
            name: user ? 'Perfil' : 'Entrar',
            url: 'perfil',
            icon: <User />,
            iconActive: <User fill={fillColor} />
        },
        {
            name: 'Comunidade',
            url: 'comunidade',
            icon: <Users />,
            iconActive: <Users fill={fillColor} />
        },
        {
            name: 'Criar',
            url: 'criar',
            icon: <Plus />,
            iconActive: <Plus />
        }
    ]

    // Set active link
    const pathName = usePathname().split('/')[1]
    useEffect(() => {
        if (links.some((l) => l.url === pathName)) setPage(pathName)
        else if (!page) setPage('inicio')
    }, [pathName])

    return (
        <nav className="fixed bottom-0 z-10 flex h-[52px] w-full items-center md:static md:mt-8 md:h-max md:w-[240px] md:flex-col md:gap-1 md:px-2">
            {links.map((link, index) => {
                const { name, url, icon, iconActive } = link
                const activeLink = page === url

                return (
                    <NavButton
                        url={'/' + url}
                        icon={activeLink ? iconActive : icon}
                        name={name}
                        active={activeLink}
                        key={name}
                    />
                )
            })}
        </nav>
    )
}
