'use client'

import { createContext, useState } from 'react'
import Header from '@/layouts/Header'
import Nav from '@/layouts/Nav'
import { LoadingTopBar } from '@/components/ui/loading-top-bar'

export const LayoutContext = createContext<{
    layout: { createHeader?: string }
    setLayout?: React.Dispatch<React.SetStateAction<{}>>
}>({ layout: {} })

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState('')
    const [layout, setLayout] = useState({})

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-[15rem,1fr]">
                <Header page={page} />
                <Nav page={page} setPage={setPage} />
                <div className="min-w-0 pb-14 md:pb-0">{children}</div>
                <LoadingTopBar />
            </div>
        </LayoutContext.Provider>
    )
}
