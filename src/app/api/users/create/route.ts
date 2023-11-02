import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { z } from 'zod'
import type { NextRequest } from 'next/server'
import startDB from '@/lib/mongoose'
import users from '@/models/user'

const teacherEmails = [
    '@edu.se.df.gov.br'
]

export async function POST(req: NextRequest) {
    const data = await req.json()
    const schema = z.object({
        name: z.string().trim().regex(/^[a-zA-ZÀ-ú]+$/).min(2).max(22),
        gender: z.enum(['m', 'f', 'u']),
        level: z.coerce.number().int().min(1).max(3),
    })

    try {
        const user = schema.parse(data)

        const session = await getServerSession(authOptions)
        if(!session) throw new Error()
        
        // // With all the data validated, we can now create the user
        await startDB()

        const userEmail = session.user.email
        await users.findOneAndUpdate({ 'account.email': userEmail }, {
            profile: {
                name: user.name,
                gender: user.gender,
                level: user.level,
                role: teacherEmails.some((email) => userEmail.endsWith(email)) ? 'teacher' : 'student'
            }
        })

        return NextResponse.json({ message: 'Success' }, { status: 200 })
    }
    catch {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}
