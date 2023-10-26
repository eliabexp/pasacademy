'use client'

import styles from './styles/Nav.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface LinksList {
    [key: string]: {
        name: string
        url: string
        icon: string
    }
}

export default function Nav() {
    const links: LinksList = {
        inicio: {
            name: 'Início',
            url: '/inicio',
            icon: '/assets/icons/inicio.svg'
        },
        obras: {
            name: 'Obras',
            url: '/obras',
            icon: '/assets/icons/obras.svg'
        },
        questoes: {
            name: 'Questões',
            url: '/questoes',
            icon: '/assets/icons/questoes.svg'
        },
        trilhas: {
            name: 'Trilhas',
            url: '/trilhas',
            icon: '/assets/icons/trilhas.svg'
        },
        comunidade: {
            name: 'Comunidade',
            url: '/comunidade',
            icon: '/assets/icons/comunidade.svg'
        }
    }
    const linksArray = Object.keys(links)

    // Set active link
    const pathName = usePathname().split('/')[1]
    const [page, setPage] = useState(pathName)
    useEffect(() => {
        if(linksArray.includes(pathName)) setPage(pathName)
    }, [pathName])

    return (
        <nav className={styles.nav}>
            <menu>
            {
                linksArray.map((key: string) => {
                    const link = links[key]
                    const active = key === page
                    return <Link rel="preload" href={link.url} key={key} className={active ? styles.active : ''} onClick={() => setPage(key)}><img src={active ? link.icon.replace('.svg', '-active.svg') : link.icon} alt={link.name}/>{link.name}</Link>
                })
            }
            </menu>
        </nav>
    )
}
