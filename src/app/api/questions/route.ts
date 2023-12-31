import { NextResponse, type NextRequest } from 'next/server'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import questions from '@/models/question'

interface Query {
    id?: string
    subject?: string
    name?: string
}

async function getQuestion(query: Query) {
    await startDB()

    const data = await questions.findOne(query).select({ _id: 0, __v: 0 }).lean()

    return data
}

async function getQuestions(query: Query) {
    await startDB()
}

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const schema = z.object({
        id: z.string().optional(),
        subject: z.string().optional(),
        name: z.string().optional()
    })

    try {
        const query = schema.parse(Object.fromEntries(params.entries()))
    } catch {
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }

    notFound()
}
