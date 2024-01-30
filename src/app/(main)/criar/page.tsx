'use client'

import { Content, Form } from '@/layouts/Criar'
import { redirect } from 'next/navigation'
import { useSession } from '@/hooks/auth'
import { useEffect, useState } from 'react'

export default function Criar() {
    const user = useSession()
    // if (!user) redirect('/login')

    const [options, setOptions] = useState<{
        type?: string
        title?: string
        subject?: string
        subjects?: string[]
        level?: number
    }>({})

    // Animate form
    useEffect(() => {}, [options])

    return (
        <main className="flex w-full p-4">
            <Form
                className={options.type ? 'hidden' : ''}
                options={options}
                setOptions={setOptions}
            />
            {options.type === 'content' && (
                <Content className="grow" options={options} setOptions={setOptions} />
            )}
        </main>
    )
}
