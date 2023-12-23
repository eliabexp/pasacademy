'use client'

import styles from '@/styles/main/ContentRow.module.scss'
import Image from 'next/image'
import { redirect } from 'next/navigation'

interface ContentRowProps {
    row: {
        name: string
        contents: {
            id: string
            subject: string
            name: string
            title: string
            thumb: string
        }[]
    }
}

export default function ContentRow({ row }: ContentRowProps) {
    if(!row) return (<></>)

    return (
        <section className={styles.section}>
            <h2>{row.name}</h2>
            <ul className={styles.row}>
                {row.contents.map((content: any) => (
                    <li key={content.id} className={styles.item}>
                        <button onClick={() => window.location.href = `/${content.subject}/${content.name}`}>
                            <Image src={content.thumb} alt={content.title} width={240} height={135} />
                            {content.title}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}