'use client'

import Input from '@/components/ui/Input'
import SearchOption from '@/components/ui/SearchOption'
import { useState, useEffect } from 'react'

interface SearchProps {
    subject?: string
    placeholder: string
}

interface Result {
    id: string
    subject: string
    subjectTitle: string
    name: string
    title: string
}

export default function Search({ subject, placeholder }: SearchProps) {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if (search.length < 2) return

        // Delay the request to avoid too many requests
        const delay = setTimeout(() => {
            fetch(`/api/contents?multiple&name=${search}${subject ? `&subject=${subject}` : ''}`, {
                next: {
                    revalidate: 600
                }
            })
                .then((res) => {
                    if (res.ok) return res.json()
                })
                .then((data) => {
                    setResults(data)
                })
        }, 200)

        return () => clearTimeout(delay)
    }, [search])

    return (
        <div className="relative w-full md:w-3/4 md:max-w-96">
            <Input
                type="search"
                placeholder={placeholder}
                minLength={2}
                maxLength={48}
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value.trimStart())}
            />
            {results.length > 0 && (
                <menu className="absolute top-full mt-2 w-full overflow-hidden rounded-xl border bg-black">
                    {results.map(({ id, subject, subjectTitle, name, title }: Result) => {
                        return (
                            <li key={id}>
                                <SearchOption
                                    title={title}
                                    subjectTitle={subjectTitle}
                                    subject={subject}
                                    name={name}
                                />
                            </li>
                        )
                    })}
                </menu>
            )}
        </div>
    )
}
