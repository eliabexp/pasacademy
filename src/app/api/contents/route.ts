import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import { auth } from '@/auth'
import startDB from '@/lib/mongoose'
import contents from '@/models/content'
import users from '@/models/user'
import { type PipelineStage } from 'mongoose'

interface Query {
    id?: string
    subject?: string
    level?: number
    name?: string
    sort?: 'new' | 'view'
    status?: 'published' | 'draft' | 'all'
}

async function getContent(query: Query) {
    await startDB('platformDB')

    const data = await contents.findOne(query).select({ _id: 0 }).lean()
    return data
}

async function getContents(query: Query) {
    await startDB('platformDB')

    const pipeline: PipelineStage[] = []

    if(query.sort) {
        if(query.sort === 'new') pipeline.push({ $sort: { createdAt: -1 } })
        else if(query.sort === 'view') pipeline.push({ $sort: { views: -1 } })
    }

    if(query.status === 'all') query.status = undefined

    if(query.name) {
        pipeline.push({
            $search: {
                index: 'contents',
                autocomplete: {
                    query: query.name,
                    path: 'title'
                }
            }
        })
    }

    pipeline.push({
        $match: {
            subject: query.subject,
            status: query.status,
            level: query.level
        }
    })
    pipeline.push({ $limit: 8 }),
    pipeline.push({ 
        $project: {
            title: 1,
            subject: 1,
            subjectTitle: 1,
            name: 1,
            id: 1,
            thumb: 1,
            _id: 0
        }
    })

    const data = await contents.aggregate(pipeline).exec()

    return data    
}

export async function GET(req: NextRequest) {
    const session = await auth()
    const params = req.nextUrl.searchParams
    const multiple = params.has('multiple')
    const schema = z.object({
        id: z.string().optional(),
        subject: z.string().optional(),
        level: z.coerce.number().int().min(1).max(3).optional(),
        name: z.string().optional(),
        sort: z.enum(['new', 'view']).optional(),
        status: z.enum(['published', 'draft', 'all']).default('published'),
    })

    const parse = schema.safeParse(Object.fromEntries(params.entries()))
    if(!parse.success) return NextResponse.json({ error: 'Invalid query' }, { status: 400 })

    const query = parse.data
    if(multiple) {
        const data = await getContents(query)
        if(data) return NextResponse.json(data, { status: 200 })
    }
    else {
        const data = await getContent(query)
        if(data) return NextResponse.json(data, { status: 200 })
    }

    notFound()
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        title: z.string(),
        subject: z.enum(['portugues', 'geografia', 'historia', 'sociologia', 'filosofia', 'artes', 'ingles', 'espanhol', 'frances', 'literatura', 'matematica', 'fisica', 'quimica', 'biologia', 'obras']),
        name: z.string(),
        level: z.number().int().min(1).max(3),
        publish: z.boolean(),
        content: z.string().min(100).max(16384),
        tags: z.array(z.string()),
        exercises: z.array(z.object({
            question: z.string(),
            type: z.enum(['a', 'b', 'c']),
            alternatives: z.array(z.object({
                text: z.string(),
                isCorrect: z.boolean(),
                explanation: z.string().optional()
            })),
            difficulty: z.number().int().min(1).max(3)
        }))
    })

    try {
        const session = await auth()
        if(!session || !session.user.registered) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        
        const data = schema.parse(body)

        // Check if content already exists
        const content = await contents.findOne({ subject: data.subject, name: data.name })
        if(content) return NextResponse.json({ error: 'Content already exists' }, { status: 409 })

        // Create content
        await contents.create({
            title: data.title,
            subject: data.subject,
            name: data.name,
            level: data.level,
            tags: data.tags,
            status: data.publish ? 'published' : 'draft',
            content: data.content,
            exercises: data.exercises
        })

        return NextResponse.json({ message: 'Success' }, { status: 201 })
    }
    catch(err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}
