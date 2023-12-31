import AuthProvider from '@/components/providers/AuthProvider'
import Provider from '@/components/providers/Provider'
import auth from '@/lib/auth'
import { inter } from './fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: {
        template: '%s - Pas Academy',
        default: 'Pas Academy'
    },
    description: 'Uma plataforma completa sobre o PAS UnB.'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await auth()

    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <AuthProvider user={user}>
                    <Provider>{children}</Provider>
                </AuthProvider>
            </body>
        </html>
    )
}
