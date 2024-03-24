'use client'

import { useEffect, useState } from 'react'
import {
    ContentRow,
    ContentRowList,
    ContentRowTitle,
    ContentRowCard,
    ContentRowCardImage,
    ContentRowCardTitle
} from '@/components/ui/content-row'

interface Content {
    id: string
    title: string
    thumb: string
    name: string
    subject: string
    subjectName: string
}

interface RowOfContentsProps {
    row: {
        name: string
        subjects?: string[]
        contents?: { id: string }[]
        sort?: 'new' | 'views' | null
        level?: number | null
    }
}

export default function RowOfContents({ row }: RowOfContentsProps) {
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
            .then((data) => setContents(data.contents))
    }, [row])

    return (
        <ContentRow key={row.name}>
            <ContentRowTitle>{row.name}</ContentRowTitle>
            <ContentRowList>
                {contents.map((content: Content) => (
                    <ContentRowCard href={`/${content.subject}/${content.name}`} key={content.name}>
                        <ContentRowCardImage
                            src={content.thumb}
                            alt={content.title}
                        />
                        <ContentRowCardTitle>{content.title}</ContentRowCardTitle>
                    </ContentRowCard>
                ))}
            </ContentRowList>
        </ContentRow>
    )
}
