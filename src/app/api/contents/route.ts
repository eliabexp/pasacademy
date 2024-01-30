import { NextResponse, type NextRequest } from 'next/server'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import { type PipelineStage } from 'mongoose'
import auth from '@/lib/auth'
import startDB from '@/lib/mongoose'
import contents from '@/models/content'
import users from '@/models/user'

interface Query {
    id?: string
    subject?: string
    level?: number
    name?: string
    q?: string
    sort?: 'new' | 'view'
    status?: 'published' | 'draft' | 'all'
}

async function getContents(query: Query, multiple: boolean) {
    await startDB('platformDB')

    const pipeline: PipelineStage[] = []

    // Search must be the first stage
    if (query.q) {
        pipeline.push({
            $search: {
                index: 'contents',
                autocomplete: {
                    query: query.q,
                    path: 'title'
                }
            }
        })
    }

    switch (query.sort) {
        case 'new':
            pipeline.push({ $sort: { createdAt: -1 } })
            break
        case 'view':
            pipeline.push({ $sort: { views: -1 } })
            break
    }

    if (query.status === 'all') query.status = undefined

    pipeline.push(
        {
            $match: {
                ...query.id && { id: query.id },
                ...query.subject && { subject: query.subject },
                ...query.name && { name: query.name },
                ...query.level && { level: query.level },
                ...query.status && { status: query.status }
            }
        },
        { $limit: 8 },
        { $project: { _id: 0 } }
    )

    const data = await contents.aggregate(pipeline).exec()

    if (data.length === 0 && !multiple) return null
    if (!multiple) return data[0]

    return data
}

export async function GET(req: NextRequest) {
    const user = await auth()
    const params = req.nextUrl.searchParams
    if (params.size === 0) notFound()

    const multiple = params.has('multiple')
    const schema = z.object({
        id: z.string().optional(),
        subject: z.string().optional(),
        level: z.coerce.number().int().min(1).max(3).optional(),
        name: z.string().max(100).optional(),
        q: z.string().max(100).optional(),
        sort: z.enum(['new', 'view']).optional(),
        status: z.enum(['published', 'draft', 'all']).readonly().default('published')
    })

    const parse = schema.safeParse(Object.fromEntries(params.entries()))
    if (!parse.success) return NextResponse.json({ error: 'Invalid query' }, { status: 400 })

    const query = parse.data

    // Allow access to unpublished content
    const allowedPermissions = ['contentModerator', 'admin']
    if (user && user.permissions.some((permission) => allowedPermissions.includes(permission))) {
        query.status = 'all'
    }
    else query.status = 'published'

    const data = await getContents(query, multiple)
    if (data) return NextResponse.json(data, { status: 200 })

    notFound()
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        title: z.string().trim().max(100),
        subject: z.enum([
            'portugues',
            'geografia',
            'historia',
            'sociologia',
            'filosofia',
            'artes',
            'ingles',
            'espanhol',
            'frances',
            'literatura',
            'matematica',
            'fisica',
            'quimica',
            'biologia',
            'obras'
        ]),
        name: z.string().max(100).trim().toLowerCase(),
        level: z.number().int().min(1).max(3),
        content: z.string().trim().min(100).max(16384),
        tags: z.array(z.string().min(2).max(32)).default([]),
        exercises: z
            .array(
                z.object({
                    question: z.string(),
                    type: z.enum(['a', 'b', 'c']),
                    alternatives: z.array(
                        z.object({
                            text: z.string(),
                            isCorrect: z.boolean(),
                            explanation: z.string().optional()
                        })
                    ),
                    difficulty: z.number().int().min(1).max(3)
                })
            )
            .default([])
    })

    const user = await auth()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const data = schema.parse(body)

        // Check if content already exists
        const content = await contents.findOne({
            subject: data.subject,
            $or: [{ name: data.name }, { title: data.title }]
        })
        if (content) return NextResponse.json({ error: 'Content already exists' }, { status: 409 })

        // Create content
        await contents.create({
            title: data.title,
            subject: data.subject,
            name: data.name,
            level: data.level,
            tags: data.tags,
            content: data.content,
            exercises: data.exercises
        })

        return NextResponse.json({ message: 'Success' }, { status: 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: err }, { status: 400 })
    }
}

export async function PATCH(req: NextRequest) {
    const body = await req.json()
}
