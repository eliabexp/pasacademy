import { type NextRequest, NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'
import { render } from '@react-email/render'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import MagicLink from '@/components/emails/magicLink'
import startDB from '@/lib/mongoose'
import sessions from '@/models/session'
import tokens from '@/models/token'
import users from '@/models/user'
import { auth } from '@/lib/auth'

const FacebookOAuth = async (code: string) => {
    const accessToken = await fetch(
        `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.API_URL}/auth&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`,
        { cache: 'no-cache' }
    )
        .then((res) => {
            if(!res.ok) return null
            return res.json()
        })
        .then((res) => res.access_token)

    if (!accessToken) return null

    return await fetch(`https://graph.facebook.com/v18.0/me?fields=email&access_token=${accessToken}`, {
        cache: 'no-cache'
    }).then((res) => res.json())
}

const GoogleOAuth = async (code: string) => {
    const accessToken = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.API_URL}/auth&grant_type=authorization_code`
    })
        .then((res) => {
            if (!res.ok) return null
            return res.json()
        })
        .then((res) => res.access_token)

    if (!accessToken) return null

    return await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
        { cache: 'no-cache' }
    ).then((res) => res.json())
}

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const code = params.get('code')
    const emailToken = params.get('token')
    const state = params.get('state')
    if (!code && !emailToken) redirect('/login')

    let user
    let provider

    if (code && state === 'facebook') {
        user = await FacebookOAuth(code)
        provider = 'facebook'
    }
    else if (code && state === 'google') {
        user = await GoogleOAuth(code)
        provider = 'google'
    }
    else if (emailToken) {
        user = await tokens.findOneAndDelete({ token: emailToken, expires: { $gt: Date.now() } })
    }

    if (!user || !user.email) redirect('/login')

    // Sync providers
    const session = await auth()
    if (session) {
        await startDB('platformDB')
        const userData = await users.findOne({ id: session.id })
        if (!userData) redirect('/login')

        await users.findOneAndUpdate({ id: userData.id }, { $addToSet: { 'account.providers': provider } })

        redirect('/perfil')
    }

    // Get user id if exists
    await startDB('platformDB')
    const userData = await users.findOne({ email: user.email })

    // Create session
    await startDB('authDB')
    const newSession = await sessions.create({
        token: randomUUID(),
        userId: userData ? userData.id : user.email,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        ...provider && { provider }
    })

    const isInDevEnvironment = process.env.NODE_ENV === 'development' // disable https only cookies in development environment

    cookies().set({
        sameSite: 'lax',
        httpOnly: true,
        secure: isInDevEnvironment ? false : true,
        name: `${isInDevEnvironment ? '' : '__Host-'}token`,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        value: newSession.token
    })

    redirect('/login')
}

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

        const url = `${process.env.API_URL}/auth?token=${token}`

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
            from: 'PAS Academy <contato@pasacademy.com.br>',
            to: [email],
            subject: 'Faça login no PAS Academy',
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
