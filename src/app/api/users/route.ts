import { NextResponse, type NextRequest } from 'next/server'
import auth from '@/lib/auth'
import { z } from 'zod'
import startDB from '@/lib/mongoose'
import users from '@/models/user'
import { notFound } from 'next/navigation'

async function getUser(query: { 'id'?: string; 'profile.username'?: string }) {
    await startDB()

    const data = await users.findOne(query).select({ _id: 0 }).lean()
    return data
}

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const schema = z.object({
        id: z.string().optional(),
        username: z.string().optional()
    })

    notFound()
}
