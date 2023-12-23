import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import MyAdapter from '@/lib/mongoose/adapter'
import users, { type User } from '@/models/user'
import startDB from '@/lib/mongoose'
import { createTransport } from 'nodemailer'

const pronouns: { [key: string]: string } = { m: 'o', f: 'a', u: 'o(a)' }

function generateEmail(url: string, user: User | null) {
    // Generate email body
    const text = { greeting: '', description: '', button: '' }
    if(user) {
        text.greeting = `Olá ${user.profile.name},`
        text.description = `Bem-vind${pronouns[user.profile.gender]} de volta! Para fazer login é só clicar no botão abaixo`
        text.button = 'Entrar'
    }
    else {
        text.greeting = 'Seja bem-vindo(a)'
        text.description = 'Que bom te conhecer! Para fazer login é só clicar no botão abaixo'
        text.button = 'Criar conta'
    }

    return `
        <body style="color: black;">
            <h1>Entrar no PAS Academy</h1>
            <h2>${text.greeting}</h2>
            <p style="font-weight: bold;">${text.description}</p>
            <a href="${url}" style="background-color: #1912a1; border-radius: 16px; color: white; display: block; font-weight: bold; margin: 16px 0; padding: 12px 0; text-align: center; text-decoration: none; width: 200px;">${text.button}</a>
            <p>Esse link é válido por 12 horas.</p>
            <p>Bons estudos! 😉</p>
        </body>
    `
}

const authProviders = [
    EmailProvider({
        server: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        },
        sendVerificationRequest: async ({ identifier: email, url, provider: { server } }) => {
            // Get user if exists
            await startDB()
            const user = await users.findOne({ email: email })

            // Send email
            const transport = createTransport(server)
            await transport.sendMail({
                from: 'PAS Academy <contato@pasacademy.com.br>',
                to: [email],
                subject: 'Faça login no PAS Academy',
                html: generateEmail(url, user)
            })
        }
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
]

export const { handlers: { GET, POST }, auth } = NextAuth({
    adapter: MyAdapter(),
    callbacks: {
        async session({ session, user }) {
            await startDB()

            const userData = await users.findOne({ email: user.email })
            if(!userData) {
                session.user = { registered: false, email: user.email }
                return session   
            }

            session.user = {
                id: userData.id,
                email: userData.email,
                level: userData.profile.level,
                name: userData.profile.name,
                username: userData.profile.username,
                permissions: userData.account.permissions,
                plus: userData.account.plusSubscription?.active,
                pronoun: pronouns[userData.profile.gender],
                registered: true
            }

            return session
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login?confirmarEmail',
        newUser: '/login/registrar'
    },
    providers: authProviders
})