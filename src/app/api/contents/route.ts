import { type NextRequest, NextResponse } from 'next/server'
import { type PipelineStage } from 'mongoose'
import contents, { type Content } from '@/models/content'
import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import startDB from '@/lib/mongoose'
import { z } from 'zod'

interface Query {
    subject?: string
    name?: string
    level?: number
    q?: string
    sort?: 'new' | 'view'
    status?: 'public' | 'draft' | 'all'
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
                ...query.subject && { subject: query.subject },
                ...query.name && { name: query.name },
                ...query.level && { level: query.level },
                ...query.status && { status: query.status }
            }
        },
        { $limit: 8 },
        { $project: { _id: 0 } }
    )

    const data: Content[] = await contents.aggregate(pipeline).exec()

    if (data.length === 0 && !multiple) return null
    if (!multiple) return data[0]

    return {
        contents: data
    }
}

export async function GET(req: NextRequest) {
    const session = await auth()
    const params = req.nextUrl.searchParams
    if (params.size === 0) notFound()

    const multiple = params.has('multiple')
    const schema = z.object({
        subject: z.string().optional(),
        name: z.string().max(48).optional(),
        level: z.coerce.number().int().min(1).max(3).optional(),
        q: z.string().max(48).optional(),
        sort: z.enum(['new', 'view']).optional(),
        status: z.enum(['public', 'draft', 'all']).default('public')
    })

    const parse = schema.safeParse(Object.fromEntries(params.entries()))
    if (!parse.success) return NextResponse.json({ error: 'Invalid query' }, { status: 400 })

    const query = parse.data

    // Restrict access to unpublished content
    const allowedPermissions = ['contentModerator', 'admin']
    if (session && session.permissions.some((permission) => allowedPermissions.includes(permission))) {
        query.status = 'all'
    }
    else query.status = 'public'

    const data = await getContents(query, multiple)
    if (!data) notFound()

    return NextResponse.json(data, { status: 200 })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        title: z.string().trim().max(96), // TODO: .regex(/^[a-zA-Z0-9\s,]+$/)
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
        level: z.coerce.number().int().min(1).max(3),
        content: z.string().trim().min(96).max(16384),
        files: z.array(z.string()).default([]),
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

    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const data = schema.parse(body)

        // Check if content already exists
        const content = await contents.findOne({
            subject: data.subject,
            title: data.title
        })
        if (content) return NextResponse.json({ error: 'Content already exists' }, { status: 409 })

        // Create content
        await contents.create({
            authorId: session.id,
            title: data.title,
            subject: data.subject,
            name: data.title.slice(0, 48).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, ''),
            level: data.level,
            tags: data.tags,
            content: data.content,
            exercises: data.exercises
        })

        return NextResponse.json({ message: 'Success' }, { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: err }, { status: 400 })
    }
}