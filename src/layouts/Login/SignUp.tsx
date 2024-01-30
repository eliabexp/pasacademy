'use client'

import Button from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function SignUp({ action }: { action: (formData: FormData) => void }) {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <h1 className="mb-8 text-center text-3xl font-bold">
                Seja bem-vindo ao
                <br />
                Pas Academy!
            </h1>
            <form action={action} onSubmit={() => setLoading(true)}>
                <div className="mx-auto mb-6 w-72">
                    <label htmlFor="name" className="mb-1 ml-2 block text-left">
                        Como você quer ser chamado(a)?
                    </label>
                    <input
                        autoComplete="name"
                        className="w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-white"
                        id="name"
                        minLength={2}
                        maxLength={22}
                        name="name"
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        placeholder="Digite seu nome"
                        title="Seu nome não pode conter números ou caracteres especiais"
                        type="text"
                        required
                    />
                </div>
                <div className="mx-auto mb-6 w-72">
                    <p className="mb-1 ml-2 block text-left">Gênero (opcional)</p>
                    <div className="flex items-center gap-3">
                        <input type="radio" name="gender" id="m" value="m" />
                        <label htmlFor="m">Masculino</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="radio" name="gender" id="f" value="f" />
                        <label htmlFor="f">Feminino</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="radio" name="gender" id="u" value="u" defaultChecked />
                        <label htmlFor="u">Não selecionar</label>
                    </div>
                </div>
                <div className="mx-auto mb-6 w-72">
                    <label htmlFor="level" className="mb-1 ml-2 block text-left">
                        Qual etapa do PAS você vai fazer esse ano?
                    </label>
                    <select
                        className="w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-white"
                        id="level"
                        name="level"
                        required
                    >
                        <option value="" hidden disabled>
                            Selecione uma opção
                        </option>
                        <option value="1">1ª etapa</option>
                        <option value="2">2ª etapa</option>
                        <option value="3">3ª etapa</option>
                    </select>
                </div>
                <Button
                    className="mx-auto mb-8 bg-white text-black"
                    disabled={loading}
                    type="submit"
                >
                    {loading && <Loader2 className="animate-spin" />}
                    Criar conta
                </Button>
            </form>
            <p className="mx-4 [&_a]:underline [&_a]:underline-offset-2">
                Ao continuar, você concorda com nossos <a href="/termos">Termos de serviço</a> e
                nossa <a href="/privacidade">Política de privacidade</a>
            </p>
        </>
    )
}
