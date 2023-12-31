import { NextResponse, type NextRequest } from 'next/server'
import sessions from '@/models/session'

export async function DELETE(req: NextRequest) {
    const cookieName = `${process.env.NODE_ENV === 'development' ? '' : '__Secure-'}token`
    const sessionToken = req.cookies.get(cookieName)
    if (!sessionToken)
        return NextResponse.json({ error: 'No session token found' }, { status: 401 })

    req.cookies.delete(cookieName)
    await sessions.findOneAndDelete({ token: sessionToken.value })

    return NextResponse.json({ message: 'Success', status: 200 })
}
