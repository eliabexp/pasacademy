import '@/styles/globals.scss'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
