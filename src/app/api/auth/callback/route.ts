import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import { randomUUID } from 'crypto'
import { redirect } from 'next/navigation'
import sessions from '@/models/session'
import startDB from '@/lib/mongoose'
import tokens from '@/models/token'
import users from '@/models/user'

async function FacebookOAuth(code: string) {
    const accessToken = await fetch(
        `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.API_URL}/auth/callback&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`,
        { cache: 'no-cache' }
    )
        .then((res) => res.json())
        .then((res) => res.access_token)

    return await fetch(`https://graph.facebook.com/v18.0/me?fields=email&access_token=${accessToken}`, {
        cache: 'no-cache'
    }).then((res) => res.json())
}

async function GoogleOAuth(code: string) {
    const accessToken = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.API_URL}/auth/callback&grant_type=authorization_code`
    })
        .then((res) => res.json())
        .then((res) => res.access_token)

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

    if (code && state === 'facebook') user = await FacebookOAuth(code)
    else if (code && state === 'google') user = await GoogleOAuth(code)
    else if (emailToken) user = await tokens.findOneAndDelete({ token: emailToken, expires: { $gt: Date.now() } })

    if (!user || !user.email) redirect('/login')

    // Get user id if exists
    await startDB('platformDB')
    const userData = await users.findOne({ email: user.email })

    // Create session
    await startDB('authDB')
    const session = await sessions.create({
        token: randomUUID(),
        userId: userData ? userData.id : user.email,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
    })

    const isInDevEnvironment = process.env.NODE_ENV === 'development' // disable https only cookies in development environment

    cookies().set({
        sameSite: 'lax',
        httpOnly: true,
        secure: isInDevEnvironment ? false : true,
        name: `${isInDevEnvironment ? '' : '__Host-'}token`,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        value: session.token
    })

    redirect('/login')
}
