import { NextResponse, type NextRequest } from 'next/server'
import { WorkOS } from '@workos-inc/node'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'
import startDB from '@/lib/mongoose'
import sessions from '@/models/session'
import tokens from '@/models/token'
import users from '@/models/user'

const workos = new WorkOS(process.env.WORKOS_API_KEY)

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const code = params.get('code')
    const token = params.get('token')
    if (!code && !token) redirect('/login')

    let user
    if (code) {
        user = await workos.userManagement
            .authenticateWithCode({
                clientId: process.env.WORKOS_CLIENT_ID,
                code
            })
            .then((data) => data.user)
            .catch(() => redirect('/login'))
    } else {
        user = await tokens.findOneAndDelete({ token, expires: { $gt: Date.now() } })
        if (!user) redirect('/login')
    }

    // Get user id if exists
    await startDB('platformDB')
    const userData = await users.findOne({ email: user.email })

    // Create session
    await startDB('authDB')
    const sessionId = randomUUID()

    await sessions.create({
        token: sessionId,
        userId: userData.id || user.email,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
    })

    cookies().set({
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        name: `${process.env.NODE_ENV === 'development' ? '' : '__Secure-'}token`,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        value: sessionId
    })

    if (!userData) redirect('/login')
    return NextResponse.redirect(process.env.API_URL + '/login')
}
