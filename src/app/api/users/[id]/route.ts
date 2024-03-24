import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { permissions } from '@/lib/auth/permissions'
import startDB from '@/lib/mongoose'
import { subject } from '@casl/ability'
import users from '@/models/user'
import { z } from 'zod'

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    await startDB()

    const session = await auth()

    notFound()
}

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await startDB()
    const user = await users.findOne({ id })
    if (!user) notFound()

    if (!permissions(session).can('update', subject('User', user)))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const schema = z.object({
        name: z.string().min(2).max(22).optional(),
        username: z.string().min(2).max(22).optional(),
        gender: z.enum(['m', 'f', 'u']).optional(),
        level: z.coerce.number().int().min(1).max(3).optional()
    })

    const data = schema.parse(body)

    return NextResponse.json({}, { status: 200 })
}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await startDB()
    const user = await users.findOne({ id })
    if (!user) notFound()

    if (!permissions(session).can('delete', subject('User', user)))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    return NextResponse.json({ message: 'Success' }, { status: 200 })
}
