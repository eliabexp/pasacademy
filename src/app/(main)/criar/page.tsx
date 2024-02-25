'use client'

import { Content, Form } from '@/layouts/Criar'
import { redirect } from 'next/navigation'
import { useSession } from '@/hooks/auth'
import { useState } from 'react'

type Options = {
    type?: string
} | {
    type: 'content'
    title: string
    subject: string
    level: number
} | {
    type: 'question' | 'roadmap'
    title: string
    subjects: string[]
    level: number
}

export default function Criar() {
    const user = useSession()
    // if (!user) redirect('/login')

    const [options, setOptions] = useState<Options>({})

    return (
        <main className="flex w-full p-4">
            <Form
                options={options}
                setOptions={setOptions}
            />
            {options.type === 'content' && (
                <Content className="grow" options={options} setOptions={setOptions} />
            )}
        </main>
    )
}
