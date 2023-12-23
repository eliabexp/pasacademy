import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import users from '@/models/user'
import { redirect } from 'next/navigation'

export async function GET(req: NextRequest) {
    const session = await auth()
    if(!session || !session.user.registered) redirect('/login')

    await startDB()
    const user = await users.findOne({ id: session.user.id })
    const drafts = user.study.contents.drafts

    return NextResponse.json({ drafts }, { status: 200 })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        title: z.string().trim().min(2).max(22),
        subject: z.enum(['portugues', 'geografia', 'historia', 'sociologia', 'filosofia', 'artes', 'ingles', 'espanhol', 'frances', 'literatura', 'matematica', 'fisica', 'quimica', 'biologia', 'obras']),
        level: z.coerce.number().int().min(1).max(3),
        content: z.string(),
        tags: z.array(z.string().trim().min(2).max(22)),
    })

    const session = await auth()
    if(!session || !session.user.registered) redirect('/login')

    try {
        const data = schema.parse(body)

        await startDB()
        const user = await users.findOne({ id: session.user.id })
        const drafts = user.study.contents.drafts
        if(drafts.length >= 10) return NextResponse.json({ error: 'Maximum number of drafts reached' }, { status: 403 })

        await users.updateOne({ id: session.user.id }, { $addToSet: { 'study.contents.drafts': data } })
        return NextResponse.json({ message: 'Success' }, { status: 200 })
    }
    catch(err) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}