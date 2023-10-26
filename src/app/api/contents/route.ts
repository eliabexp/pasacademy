import type { NextRequest } from 'next/server'
import type { Content } from 'types/api'
import { NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import contents from '@/models/content.js'

interface ContentQuery {
    id?: string
    subject?: string, 
    name?: string, 
}

async function getContent(query: ContentQuery) {
    await startDB()

    const data: Content | null = await contents.findOne(query).select({ _id: 0, __v: 0 }).lean()

    return data
}

async function getContents(query: ContentQuery) {
    await startDB()

    // Search
    if(query.name) {
        const search = {
            index: 'contents',
            text: {
                query: query.name,
                path: {
                    wildcard: '*'
                }
            }
        }
        const data = await contents.aggregate().search(search)

        return data
    }

    const data: Content[] | null = await contents.find(query).select({ _id: 0, __v: 0 }).lean()

    return data
}

export async function GET(req: NextRequest) {
    const params = new URL(req.url as string).searchParams
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
