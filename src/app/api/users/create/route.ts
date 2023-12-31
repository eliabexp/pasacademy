import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import users from '@/models/user'
import sessions from '@/models/session'
import auth from '@/lib/auth'
import { cookies } from 'next/headers'

const teacherEmails = ['@edu.se.df.gov.br']

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
        const session = await sessions.findOne({ token: token.value })

        await startDB('platformDB')
        const userEmail = session.userId
        const newUser = await users.create({
            email: userEmail,
            account: {},
            profile: {
                name: user.name,
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
