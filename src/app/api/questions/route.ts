import type { NextRequest } from 'next/server'
import type { Question } from 'types/api'
import { NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import questions from '@/models/question.js'

interface QuestionQuery {
    id?: string
    subject?: string, 
    name?: string, 
}

async function getQuestion(query: QuestionQuery) {
    await startDB()

    const data: Question | null = await questions.findOne(query).select({ _id: 0, __v: 0 }).lean()

    return data
}

async function getQuestions(query: QuestionQuery) {
    await startDB()

}

export async function GET(req: NextRequest) {
    const params = new URL(req.url as string).searchParams

    notFound()
}
