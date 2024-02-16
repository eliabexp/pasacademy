import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import startDB from '@/lib/mongoose'
import topics from '@/models/topic'

interface ContentRow {
    name: string
    contents: string[]
    subjects: string[]
    level: number
    sort: 'new' | 'view'
    type: 'contentRow'
}
interface Slider {
    name: string
    description: string
    image: string
    url: string
    type: 'slide'
}

export async function GET(req: NextRequest) {
    await startDB('platformDB')

    const session = await auth()

    const rows: ContentRow[] = []
    const slider: Slider[] = []

    const topicsArray = await topics.find({}).select({ _id: 0 }).lean()
    topicsArray
        .filter((topic) => {
            if (session) {
                if (topic.authRequired === false) return false 
                if (topic.level && session.level !== topic.level) return false // Level filter
            } else if (topic.authRequired) {
                return false
            }

            return true
        })
        .sort((a, b) => b.priority - a.priority)
        .map((topic) => {
            switch (topic.type) {
                case 'contentRow': {
                    rows.push({
                        name: topic.name,
                        contents: topic.contents,
                        subjects: topic.subjects,
                        level: topic.level,
                        sort: topic.sort,
                        type: topic.type
                    })
                    break
                }
                case 'slide': {
                    slider.push({
                        name: topic.name,
                        description: topic.description,
                        image: topic.image,
                        url: topic.url,
                        type: topic.type
                    })
                    break
                }
            }
        })

    const data = {
        slider,
        rows
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
