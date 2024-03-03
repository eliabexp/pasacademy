'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from 'lucide-react'
import { SearchResult } from '@/components/ui/search-result'
import { tv } from 'tailwind-variants'

interface SearchProps {
    subject?: string
    placeholder: string
}

interface SearchResult {
    id: string
    subject: string
    subjectName: string
    name: string
    title: string
}

const ulVariants = tv({
    base: 'absolute top-full mt-2 w-full overflow-hidden rounded-md border bg-background',
    variants: {
        isResultsOpen: {
            true: 'block',
            false: 'hidden'
        }
    }
})

export default function Search({ subject, placeholder }: SearchProps) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isResultsOpen, setIsResultsOpen] = useState(false)

    useEffect(() => {
        if (query.length === 0) return setResults([]) // Remove the list when the search is empty
        if (query.length < 2) return

        // Delay the request to avoid too many requests
        const delay = setTimeout(() => {
            fetch(`/api/contents?multiple&q=${query}`, {
                next: { revalidate: 600 }
            })
                .then((res) => {
                    if (res.ok) return res.json()
                })
                .then((data) => {
                    setResults(data.contents)
                })
        }, 200)

        return () => clearTimeout(delay)
    }, [query])

    return (
        <div className="relative w-full md:w-3/4 md:max-w-md">
            <div className="relative size-full">
                <Input
                    className="pl-9 text-base"
                    type="search"
                    id="search"
                    placeholder={placeholder}
                    minLength={2}
                    maxLength={48}
                    autoComplete="off"
                    onChange={(e) => setQuery(e.target.value.trimStart())}
                    onFocus={() => setIsResultsOpen(true)}
                    onBlur={() => setTimeout(() => setIsResultsOpen(false), 150)}
                />
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2" size="20" />
            </div>
            {results.length > 0 && (
                <ul className={ulVariants({ isResultsOpen })}>
                    {results.map(({ id, subject, subjectName, name, title }: SearchResult) => {
                        return (
                            <li key={id}>
                                <SearchResult
                                    title={title}
                                    subjectName={subjectName}
                                    subject={subject}
                                    name={name}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
