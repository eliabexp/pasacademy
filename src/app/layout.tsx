import '@/styles/global.scss'
import AuthProvider from '@/components/plugins/AuthProvider'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import type { Metadata } from 'next'

// Fonts
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s - PAS Academy',
        default: 'PAS Academy'
    },
    description: 'Uma plataforma completa sobre o PAS UnB.'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <AuthProvider session={session}>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
