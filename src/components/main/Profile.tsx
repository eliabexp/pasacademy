'use client'

import styles from '@/styles/main/Profile.module.scss'
import Image from 'next/image'
import { Session } from 'next-auth'

export default function Profile({ user }: { user: Session['user'] }) {
    if(!user.registered) return 

    return (
        <section className={styles.container}>
            <Image src={'https://picsum.photos/128'} alt={user.name} width="128" height="128" />
            <div className={styles.userInfo}>
                <h2>{user.name}</h2>
                <span>@{user.username}</span>
            </div>
            <div>
                <button>Editar perfil</button>
            </div>
        </section>
    )
}