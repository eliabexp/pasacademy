import type { Metadata, Viewport } from 'next'
import AuthProvider from '@/components/providers/AuthProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { auth } from '@/lib/auth'
import { inter } from './fonts'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
    title: {
        template: '%s - PAS Academy',
        default: 'PAS Academy'
    },
    description: 'Uma plataforma completa sobre o PAS UnB.'
}

export const viewport: Viewport = {
    maximumScale: 1
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <AuthProvider user={session}>
                    <ThemeProvider>{children}</ThemeProvider>
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    )
}
