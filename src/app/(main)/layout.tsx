'use client'

import { createContext, useState } from 'react'
import Header from '@/layouts/Header'
import Nav from '@/layouts/Nav'

export const LayoutContext = createContext<{
    layout: { createHeader?: { title: string; level: string } }
    setLayout?: React.Dispatch<React.SetStateAction<{}>>
}>({ layout: {} })

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState('')
    const [layout, setLayout] = useState({})

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            <Header page={page} />
            <div className="relative flex flex-col pb-14 md:flex-row md:pb-0">
                <Nav page={page} setPage={setPage} />
                {children}
            </div>
        </LayoutContext.Provider>
    )
}
