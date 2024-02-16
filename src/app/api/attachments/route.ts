import { type NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const storage = new Storage({
        credentials: {
            client_email: process.env.GCLOUD_CLIENT_EMAIL,
            private_key: process.env.GCLOUD_PRIVATE_KEY,
            project_id: process.env.GCLOUD_PROJECT_ID,
        },
    })
    const bucket = storage.bucket('pasacademy')
    await bucket.setCorsConfiguration([
        {
            maxAgeSeconds: 3600,
            method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            origin: ['*'],
            responseHeader: ['*']
        }
    ])

    const data = await req.formData()
    const file = data.get('file') as File | null

    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxFileSize = 1024 * 1024 * 6 // 6MB

    if (!file) return NextResponse.json({ error: 'No file found' }, { status: 400 })
    if (file.size > maxFileSize)
        return NextResponse.json({ error: 'File too large' }, { status: 400 })
    if (!allowedTypes.includes(file.type))
        return NextResponse.json({ error: 'Invalid file' }, { status: 400 })

    // Generate signed URL
    const fileName = `${file.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^a-z0-9_.]/g, '')}` // Generated name of the file
    const [signedUrl] = await bucket.file(fileName).getSignedUrl({
        action: 'write',
        contentType: file.type,
        expires: Date.now() + 1000 * 60 * 10,
        extensionHeaders: { 'content-length': `${file.size}` },
        version: 'v4'
    })
    if (!signedUrl)
        return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 })

    return NextResponse.json({
        signedUrl,
        filePath: `https://pasacademy.storage.googleapis.com/${fileName}`
    })
}
