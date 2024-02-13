import { type NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { createTransport } from 'nodemailer'
import { render } from '@react-email/render'
import MagicLink from '@/components/emails/magicLink'
import startDB from '@/lib/mongoose'
import sessions from '@/models/session'
import tokens from '@/models/token'
import users from '@/models/user'

export async function POST(req: NextRequest) {
    const body = await req.json()
    const schema = z.object({
        email: z.string().email()
    })

    try {
        const { email } = schema.parse(body)

        await startDB()
        const user = await users.findOne({ email })

        await startDB('authDB')

        // Check if a token was created in the last 10 minutes
        const previousToken = await tokens.findOne({
            email,
            createdAt: { $gt: Date.now() - 600000 }
        })
        if (previousToken) return NextResponse.json({ message: 'Success' }, { status: 200 })

        const token = randomUUID()
        await tokens.create({ token, email })

        const url = `${process.env.API_URL}/auth/callback?token=${token}`

        const emailBody = render(MagicLink({ url, user }))

        // Send email
        const transport = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
        await transport.sendMail({
            from: 'Pas Academy <contato@pasacademy.com.br>',
            to: [email],
            subject: 'Faça login no Pas Academy',
            html: emailBody
        })

        return NextResponse.json({ message: 'Success' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest) {
    const cookieName = `${process.env.NODE_ENV === 'development' ? '' : '__Host-'}token`
    const sessionToken = req.cookies.get(cookieName)
    if (!sessionToken)
        return NextResponse.json({ error: 'No session token found' }, { status: 401 })

    await startDB('authDB')
    await sessions.findOneAndDelete({ token: sessionToken.value })

    req.cookies.delete(cookieName)

    return NextResponse.json({ message: 'Success', status: 200 })
}
