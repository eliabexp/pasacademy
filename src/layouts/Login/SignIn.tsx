'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

interface SignInProps {
    facebookOAuthUrl: string
    googleOAuthUrl: string
    sendEmailAction: (formData: FormData) => void
}

export default function SignIn({ facebookOAuthUrl, googleOAuthUrl, sendEmailAction }: SignInProps) {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <h1 className="mb-8 text-center text-3xl font-bold">
                Apenas uma conta para toda a sua jornada de estudante
            </h1>
            <div className="mx-auto flex w-80 flex-col items-center gap-2">
                <button
                    className="mx-auto flex w-full items-center justify-center gap-3 rounded-3xl border bg-white px-4 py-2.5 font-bold text-black transition-colors duration-300 hover:bg-white/80"
                    onClick={() => (window.location.href = googleOAuthUrl)}
                >
                    <Image src="/assets/icons/google.png" alt="Google" width="28" height="28" />
                    Continuar com Google
                </button>
                <button
                    className="mx-auto flex w-full items-center justify-center gap-3 rounded-3xl border bg-white px-4 py-2.5 font-bold text-black transition-colors duration-300 hover:bg-white/80"
                    onClick={() => (window.location.href = facebookOAuthUrl)}
                >
                    <Image src="/assets/icons/facebook.png" alt="Facebook" width="28" height="28" />
                    Continuar com Facebook
                </button>
            </div>
            <span className="block p-4 before:relative before:right-2 before:inline-block before:h-[1px] before:w-1/3 before:border before:align-middle after:relative after:left-2 after:inline-block after:h-[1px] after:w-1/3 after:border after:align-middle">
                ou
            </span>
            <form action={sendEmailAction} className="text-left" onSubmit={() => setLoading(true)}>
                <div className="mx-auto mb-12 w-72">
                    <Label htmlFor="email" className="mb-2 ml-1 block">
                        E-mail
                    </Label>
                    <Input
                        autoComplete="email"
                        className="border-white"
                        id="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        required
                        type="email"
                    />
                </div>
                <Button className="mx-auto mb-8 flex gap-2" disabled={loading}>
                    {loading && <Loader2 className="animate-spin" />}
                    Continuar
                </Button>
            </form>
            <p className="mx-4 [&_a]:underline [&_a]:underline-offset-2">
                Ao continuar, você concorda com nossos <a href="/termos">Termos de serviço</a> e
                nossa <a href="/privacidade">Política de privacidade</a>
            </p>
        </>
    )
}
