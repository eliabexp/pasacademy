'use client'

import styles from './styles/Search.module.scss'
import { useState, useEffect, Suspense } from 'react'

interface Result {
    id: string
    name: string
    subject: string
}

export default function Search({ subject }: { subject?: string }) {
    let placeholder
    switch(subject) {
        case 'obras': 
            placeholder = 'Pesquisar obras'
            break
        default:
            placeholder = 'O que você quer estudar hoje?'
    }

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if(search.length < 2) return setResults([])

        const delayDebounceFn = setTimeout(() => {
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
        
        return () => clearTimeout(delayDebounceFn)
    }, [search])

    return (
        <>
        <input className={styles.input} type="search" name="search" placeholder={placeholder} minLength={2} maxLength={48} autoComplete="off" onChange={(e) => setSearch(e.target.value)}/>
        <Suspense fallback={<h2>Carregando...</h2>}>
            {
                results.map(({ name, subject }: Result) => {
                    return (
                        <div className={styles.result} key={name}>
                            <a href={`/${subject}/${name}`}>{name}</a>
                        </div>
                    )
                })
            }
        </Suspense>
        </>
    )
}