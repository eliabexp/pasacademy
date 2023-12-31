import { NextResponse, type NextRequest } from 'next/server'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { createTransport } from 'nodemailer'
import startDB from '@/lib/mongoose'
import tokens from '@/models/token'
import users, { type User } from '@/models/user'

function generateEmail(url: string, user: User | null) {
    // Generate email body
    const pronouns: { [key: string]: string } = { m: 'o', f: 'a', u: 'o(a)' }
    const text = { greeting: '', description: '', button: '' }

    if (user) {
        text.greeting = `Olá ${user.profile.name},`
        text.description = `Bem-vind${
            pronouns[user.profile.gender]
        } de volta! Para fazer login é só clicar no botão abaixo`
        text.button = 'Entrar'
    } else {
        text.greeting = 'Seja bem-vindo(a)'
        text.description = 'Que bom te conhecer! Para fazer login é só clicar no botão abaixo'
        text.button = 'Criar conta'
    }

    return `
        <body style="color: black;">
            <h1>Entrar no Pas Academy</h1>
            <h2>${text.greeting}</h2>
            <p style="font-weight: bold;">${text.description}</p>
            <a href="${url}" style="background-color: #1912a1; border-radius: 16px; color: white; display: block; font-weight: bold; margin: 16px 0; padding: 12px 0; text-align: center; text-decoration: none; width: 200px;">${text.button}</a>
            <p>Esse link é válido por 12 horas.</p>
            <p>Bons estudos! 😉</p>
        </body>
    `
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

        const beforeToken = await tokens.findOne({
            email,
            createdAt: { $gt: Date.now() - 1000 * 60 * 10 }
        })
        if (beforeToken) return NextResponse.json({ message: 'Success' }, { status: 200 })

        const token = randomUUID()
        await tokens.create({ token, email })

        // Send email
        const url = `${process.env.API_URL}/api/auth/callback?token=${token}`
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
            html: generateEmail(url, user)
        })

        return NextResponse.json({ message: 'Success' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
}
