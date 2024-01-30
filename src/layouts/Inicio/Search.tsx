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
        if (search.length === 0) return setResults([]) // Remove the list when the search is empty
        if (search.length < 2) return

        // Delay the request to avoid too many requests
        const delay = setTimeout(() => {
            fetch(`/api/contents?multiple&q=${search}`, {
                next: { revalidate: 600 }
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
        <div className="w-full md:w-3/4 md:max-w-96">
            <Input
                type="search"
                id="search"
                placeholder={placeholder}
                minLength={2}
                maxLength={48}
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value.trimStart())}
            >
                {results.length > 0 && (
                    <>
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
                    </>
                )}
            </Input>
        </div>
    )
}
