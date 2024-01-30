'use client'

import ContentCard from '@/components/ui/ContentCard'
import { useEffect, useState } from 'react'

interface Content {
    id: string
    title: string
    thumb: string
    name: string
    subject: string
}
interface ContentRowProps {
    row: {
        name: string
        subjects?: string[]
        contents?: { id: string }[]
        sort?: 'new' | 'views' | null
        level?: number | null
    }
}

export default function ContentRow({ row }: ContentRowProps) {
    if (!row) return <></>

    const [contents, setContents] = useState([])
    useEffect(() => {
        const query: string[] = []

        if (row.contents && row.contents.length > 0) {
            query.push(`ids=${row.contents.map((c) => c.id).join(',')}`)
        } else {
            if (row.subjects && row.subjects.length > 0)
                query.push(`subjects=${row.subjects.join(',')}`)
            if (row.sort) query.push(`sort=${row.sort}`)
            if (row.level) query.push(`level=${row.level}`)
        }

        fetch(`/api/contents?multiple&${query.join('&')}`)
            .then((res) => res.json())
            .then((data) => setContents(data))
    }, [row])

    return (
        <section className="my-4 w-full">
            <h2 className="mx-4 text-2xl font-bold">{row.name}</h2>
            <ul className="my-2 flex w-full overflow-x-auto overflow-y-hidden">
                {contents.map((content: any) => (
                    <li className="shrink-0 first:ml-4" key={content.id}>
                        <ContentCard
                            title={content.title}
                            thumb={content.thumb}
                            name={content.name}
                            subject={content.subject}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
