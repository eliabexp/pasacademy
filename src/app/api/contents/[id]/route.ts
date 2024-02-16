import { NextRequest, NextResponse } from 'next/server'
import contents, { type Content } from '@/models/content'
import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import startDB from '@/lib/mongoose'
import { z } from 'zod'

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    await startDB('platformDB')

    const session = await auth()

    const content = await contents.findOne({ id })
    if (!content) notFound()

    if (content.status === 'draft') {
        const allowedPermissions = ['contentModerator', 'admin']
        if (!session || !session.permissions.some((p) => allowedPermissions.includes(p))) notFound()
    }

    return NextResponse.json(content)
}

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await startDB('platformDB')
    const content = await contents.findOne({ id })
    if (!content) notFound()

    if (content.author !== session.id && !session.permissions.includes('admin'))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const schema = z.object({
        name: z.string().min(2).max(48).optional(),
        subject: z.string().optional(),
        level: z.coerce.number().int().min(1).max(3).optional(),
        content: z.string().optional(),
        status: z.enum(['public', 'draft']).optional()
    })

    const data = schema.parse(body)

    return NextResponse.json({}, { status: 200 })
}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await startDB('platformDB')
    const content = await contents.findOne({ id })
    if (!content) notFound()

    if (content.author !== session.id && !session.permissions.includes('admin'))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    await contents.deleteOne({ id })

    return NextResponse.json(content, { status: 200 })
}
