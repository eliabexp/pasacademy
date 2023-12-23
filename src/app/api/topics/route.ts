import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import { auth } from '@/auth'
import startDB from '@/lib/mongoose'
import topics from '@/models/topic'
import users from '@/models/user'

interface contentRow {
    name: string
    contents: Promise<any>
}
interface mainCarousel {
    name: string
    image: string
    url: string
}

export async function GET(req: NextRequest) {
    await startDB('platformDB')

    const session = await auth()
    const user = await users.findOne({ email: session?.user?.email })

    const contentRows: contentRow[] = []
    const mainCarousel: mainCarousel[] = []

    const topicsArray = (await topics.find({}).select({ _id: 0 }).lean())
    .filter((topic) => {
        if(user) {
            if(topic.level && user.profile.level !== topic.level) return false // Level filter
        }
        else if(topic.authRequired) {
            return false
        }

        return true
    })
    .sort((a, b) => b.priority - a.priority)
    .map((topic) => {
        switch(topic.type) {
            case 'contentRow': {
                contentRows.push({
                    name: topic.name,
                    contents: topic.contents
                })
                break
            }
            case 'mainCarousel': {
                mainCarousel.push({
                    name: topic.name,
                    image: topic.image,
                    url: topic.url
                })
                break
            }
        }
    })

    const data = {
        contentRows,
        mainCarousel
    }

    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    const schema = z.object({
        name: z.string().min(2).max(50),
        subjects: z.array(z.string()).optional(),
        level: z.number().int().min(1).max(3).optional(),
        priority: z.number().int().min(0).max(5).default(3),
        contents: z.array(z.string()).optional(),
        sort: z.enum(['new', 'view']).optional()
    })
}
