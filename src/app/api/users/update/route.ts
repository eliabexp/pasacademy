import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import users from '@/models/user'
import auth from '@/lib/auth'

export async function PUT(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        name: z.string().trim().min(2).max(22),
        username: z.string().trim().toLowerCase().min(3).max(22)
    })

    try {
        const data = schema.parse(body)

        const user = await auth()
        if (!user)
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        await startDB()
    } catch (err) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}
