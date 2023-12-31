'use client'

import Header from '@/layouts/Header'
import Nav from '@/layouts/Nav'
import { createContext, useState } from 'react'

export const LayoutContext = createContext(null as any)

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState('')

    return (
        <LayoutContext.Provider
            value={{
                page,
                setPage
            }}
        >
            <Header />
            <div className="relative flex flex-col md:flex-row">
                <Nav />
                {children}
            </div>
        </LayoutContext.Provider>
    )
}
