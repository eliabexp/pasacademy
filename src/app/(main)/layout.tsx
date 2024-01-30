'use client'

import Header from '@/layouts/Header'
import Nav from '@/layouts/Nav'
import { useState } from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState('')

    return (
        <>
            <Header page={page} />
            <div className="relative flex flex-col pb-14 md:flex-row md:pb-0">
                <Nav page={page} setPage={setPage} />
                {children}
            </div>
        </>
    )
}
