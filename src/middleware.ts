import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
}

export const config = {
    matcher: [
        {
            source: '/:path*',
        }
    ]
}
