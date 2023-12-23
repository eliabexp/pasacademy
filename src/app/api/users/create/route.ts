import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import startDB from '@/lib/mongoose'
import users from '@/models/user'
import sessions from '@/models/session'
import accounts from '@/models/account'

const teacherEmails = [
    '@edu.se.df.gov.br'
]

export async function POST(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        name: z.string().trim().min(2).max(22),
        gender: z.enum(['m', 'f', 'u']),
        level: z.coerce.number().int().min(1).max(3),
    })

    const session = await auth()
    if(!session || session.user.registered) redirect('/login')

    try {
        const user = schema.parse(body)

        await startDB()

        const userEmail = session.user.email
        const newUser = await users.create({
            email: userEmail,
            account: {},
            profile: {
                name: user.name,
                gender: user.gender,
                level: user.level
            }
        })

        // Update temporary session and account
        await startDB('authDB')

        await sessions.updateMany({ userId: `temp-${userEmail}` }, { userId: newUser.id })
        await accounts.updateMany({ userId: `temp-${userEmail}` }, { userId: newUser.id })

        return NextResponse.json({ message: 'Success' }, { status: 200 })
    }
    catch(err) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}
