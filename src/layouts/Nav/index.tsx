'use client'

import styles from '@/styles/nav/Nav.module.scss'
import Link from 'next/link'
import Logo from '@/components/main/Logo'
import { Home, LibraryBig, ListTodo, Route, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface LinksList {
    [key: string]: {
        name: string
        url: string
        icon: React.ReactNode
        iconActive: React.ReactNode
    }
}

export default function Nav() {
    const links: LinksList = {
        inicio: {
            name: 'Início',
            url: '/inicio',
            icon: <Home />,
            iconActive: <Home fill='#fff' />,
        },
        obras: {
            name: 'Obras',
            url: '/obras',
            icon: <LibraryBig />,
            iconActive: <LibraryBig fill='#fff' />,
        },
        questoes: {
            name: 'Questões',
            url: '/questoes',
            icon: <ListTodo />,
            iconActive: <ListTodo fill='#fff' />,
        },
        trilhas: {
            name: 'Trilhas',
            url: '/trilhas',
            icon: <Route />,
            iconActive: <Route fill='#fff' />,
        },
        perfil: {
            name: 'Perfil',
            url: '/perfil',
            icon: <User />,
            iconActive: <User fill='#fff' />,
        },
    }
    const linksArray = Object.keys(links)

    // Set active link
    const pathName = usePathname().split('/')[1]
    const [page, setPage] = useState('')
    useEffect(() => {
        if(linksArray.includes(pathName)) setPage(pathName)
        else if(!page) setPage('inicio')
    }, [pathName])

    return (
        <nav className={styles.nav}>
            <Logo />
            <menu className={styles.menu}>
                {linksArray.map((link, index) => {
                    const activeLink = page === link

                    return (
                        <li className={activeLink ? styles.active : ''} key={index}>
                            <Link href={'/' + link}>{activeLink ? links[link].iconActive : links[link].icon}{links[link].name}</Link>
                        </li>
                    )
                })}
            </menu>
        </nav>
    )
}
