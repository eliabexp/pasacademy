import '@/styles/global.scss'
import AuthProvider from '@/components/providers/AuthProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { auth } from '@/auth'
import { inter } from './fonts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: '%s - PAS Academy',
        default: 'PAS Academy'
    },
    description: 'Uma plataforma completa sobre o PAS UnB.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <AuthProvider session={session}>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
