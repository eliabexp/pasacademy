import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { auth } from '@/lib/auth'
import startDB from '@/lib/mongoose'
import users from '@/models/user'
import sessions from '@/models/session'

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const schema = z.object({
        id: z.string(),
        username: z.string().optional()
    })

    const data = schema.safeParse(params)
    if (!data.success) return notFound()

    const session = await auth()

    let query = {}
    if (data.data.id) query = { id: data.data.id }
    else if (data.data.username) query = { username: data.data.username }
    else if (session) query = { id: session.id }
    else notFound()

    const user = await users.findOne(query)
    if (!user) notFound()

    await startDB()
    let userData = {
        id: user.id,
        username: user.username,
        avatar: user.avatar
    }

    return NextResponse.json(userData, { status: 200 })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        name: z.string().trim().min(2).max(22),
        gender: z.enum(['m', 'f', 'u']),
        level: z.coerce.number().int().min(1).max(3)
    })

    const session = await auth()
    if (session !== false) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const user = schema.parse(body)

        const token = cookies().get(
            `${process.env.NODE_ENV === 'development' ? '' : '__Secure-'}token`
        )
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        await startDB('authDB')
        const sessionData = await sessions.findOne({ token: token.value })

        await startDB('platformDB')
        const userEmail = sessionData.userId
        const newUser = await users.create({
            email: userEmail,
            account: {
                providers: [sessionData.provider]
            },
            profile: {
                name: user.name,
                username: user.name.toLowerCase().normalize('NFD').replace(/[^a-z0-9_.]/g, '').slice(0, 22),
                gender: user.gender,
                level: user.level
            }
        })

        // Update temporary sessions
        await startDB('authDB')
        await sessions.updateMany({ userId: userEmail }, { userId: newUser.id })

        return NextResponse.json({ message: 'Success' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}
