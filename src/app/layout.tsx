import AuthProvider from '@/components/providers/AuthProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { auth } from '@/lib/auth'
import { inter } from './fonts'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: '%s - Pas Academy',
        default: 'Pas Academy'
    },
    description: 'Uma plataforma completa sobre o PAS UnB.'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    return (
        <html lang="pt-br">
            <body className={`${inter.className}`}>
                <AuthProvider user={session}>
                    <ThemeProvider>{children}</ThemeProvider>
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    )
}
