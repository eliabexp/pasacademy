'use client'

import styles from '@/styles/main/Search.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Result {
    id: string
    subject: string
    subjectTitle: string
    name: string
    title: string
}

export default function Search({ subject }: { subject?: string }) {
    let placeholder
    switch(subject) {
        case 'obras':
            placeholder = 'Pesquisar obras'
            break
        default:
            placeholder = 'O que vamos estudar hoje?'
    }

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if(search.length < 2) return setResults([])

        // Delay the request to avoid too many requests
        const delay = setTimeout(() => {
            fetch(`/api/contents?multiple&name=${search}${subject ? `&subject=${subject}` : ''}`, {
                next: {
                    revalidate: 600
                }
            })
            .then((res) => {
                if(res.ok) return res.json()
            })
            .then((data) => {
                setResults(data)
            })
        }, 200)
        
        return () => clearTimeout(delay)
    }, [search])

    return (
        <div className={styles.container}>
            <input className={styles.input} type="search" name="search" placeholder={placeholder} minLength={2} maxLength={48} autoComplete="off" onChange={(e) => setSearch(e.target.value)} />
            {results.length > 0 && (
                <menu className={styles.results}>
                    {
                        results.map(({ id, subject, subjectTitle, name, title }: Result) => {
                            return (
                                <li key={id}>
                                    <Link href={`/${subject}/${name}`}>
                                        <h3 className={styles.name}>{title}</h3>
                                        <span className={styles.subject}>{subjectTitle}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </menu>
            )}
        </div>
    )
}