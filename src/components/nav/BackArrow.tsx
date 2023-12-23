'use client'

import { ChevronLeft } from 'lucide-react'

export default function BackArrow() {
    return (
        <button onClick={() => window.history.back()}>
            <ChevronLeft />
        </button>
    )
}