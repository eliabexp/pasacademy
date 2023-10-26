import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import type { NextRequest } from 'next/server'
import type { User } from 'types/api'
import startDB from '@/lib/mongoose'
import users from '@/models/user'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const schema = z.object({
        name: z.string().max(22),
        gender: z.enum(['m', 'f', 'u']),
        level: z.coerce.number().int().min(1).max(3),
    })

    const session = await getServerSession()
    if(!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const user = schema.parse(data)

    // With all the data validated, we can now create the user
    await startDB()

    await users.create({
        account: {
            email: session?.user.email // email must be received from session
        },
        profile: {
            name: user.name,
            gender: user.gender,
            level: user.level
        }
    })

    return NextResponse.json({}, { status: 200 })
}