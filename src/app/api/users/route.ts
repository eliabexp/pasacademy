import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { auth, getSessionToken } from '@/lib/auth'
import startDB from '@/lib/mongoose'
import tokens from '@/models/token'
import users from '@/models/user'
import sessions from '@/models/session'

const isTeacher = (email: string) => {
    const teacherEmails = ['@edu.se.df.gov.br']

    return teacherEmails.some((teacherEmail) => email.endsWith(teacherEmail))
}

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const schema = z.object({
        username: z.string().optional()
    })

    const data = schema.safeParse(params)
    if (!data.success) notFound()

    const session = await auth()

    let query = {}
    if (data.data.username) query = { username: data.data.username }
    else if (session) query = { id: session.id }
    else notFound()

    const user = await users.findOne(query)
    if (!user) notFound()

    await startDB()
    const userData = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        role: user.profile.role
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
    if (session) redirect('/')

    const token = getSessionToken()
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await startDB('authDB')
    const sessionData = await sessions.findOne({ token, expires: { $gt: new Date() } })
    if (!sessionData) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const user = schema.parse(body)

        await startDB()
        const userEmail = sessionData.userId
        const newUser = await users.create({
            email: userEmail,
            account: {
                providers: [sessionData.provider]
            },
            profile: {
                name: user.name,
                username: user.name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[^a-z0-9_.]/g, '')
                    .slice(0, 22),
                gender: user.gender,
                level: user.level,
                role: isTeacher(userEmail) ? 'teacher' : 'student'
            }
        })

        // Delete temporary sessions
        await startDB('authDB')
        await sessions.deleteMany({ userId: userEmail })

        const authorizationToken = await tokens.create({
            token: crypto.randomUUID(),
            type: 'redirect',
            email: userEmail,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
        })

        redirect(`${process.env.API_URL}/auth/callback?token=${authorizationToken.token}`)
    } catch (err) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}
