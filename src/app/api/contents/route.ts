import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import contents, { type Content } from '@/models/content'

interface ContentQuery {
    id?: string
    subject?: string, 
    name?: string, 
}

async function getContent(query: ContentQuery) {
    await startDB()

    const data: Content | null = await contents.findOne(query).select({ _id: 0 }).lean()

    return data
}

async function getContents(query: ContentQuery) {
    await startDB()

    // Search
    if(query.name) {
        const data = await contents.aggregate()
        .search({
            index: 'contents',
            autocomplete: {
                query: query.name,
                path: 'title'
            }
        })
        .match({ subject: query.subject, status: 'published' })
        .limit(8)
        .project({ title: 1, subject: 1, subjectTitle: 1, name: 1, id: 1, _id: 0 })
        

        return data
    }

    const data: Content[] | null = await contents.find(query).select({ _id: 0 }).lean()

    return data
}

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const query = {
        id: params.get('id') ? params.get('id')?.slice(0, 8) : undefined,
        subject: params.get('subject') ? params.get('subject')?.toLowerCase() : undefined,
        name: params.get('name') ? params.get('name')?.toLowerCase() : undefined
    }
    const multiple = params.has('multiple')

    // Multiple contents
    if(multiple && !query.id) {
        const data = await getContents(query)
        if(!data) notFound()

        return NextResponse.json(data)
    }
    // Single content
    else if(query.id || (query.subject && query.name)) {
        const data = await getContent(query)
        if(!data) notFound()

        return NextResponse.json(data)
    }

    notFound()
}
