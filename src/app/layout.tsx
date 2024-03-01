import type { Metadata } from 'next'
import AuthProvider from '@/components/providers/AuthProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { inter } from './fonts'
import { redirect } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
    title: {
        template: '%s - PAS Academy',
        default: 'PAS Academy'
    },
    description: 'Uma plataforma completa sobre o PAS UnB.'
}

export function generateViewport() {
    const userAgent = headers().get('User-Agent')

    // prevent input zoom on focus on iOS devices
    if (userAgent && /iPad|iPhone|iPod/.test(userAgent)) {
        return {
            maximumScale: 1
        }
    }

    return {}
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
