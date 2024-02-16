'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export default function SignUp({ action }: { action: (formData: FormData) => void }) {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <h1 className="mb-8 text-center text-3xl font-bold">
                Seja bem-vindo ao
                <br />
                Pas Academy!
            </h1>
            <form action={action} className="text-left" onSubmit={() => setLoading(true)}>
                <div className="mx-auto mb-6 w-72">
                    <Label htmlFor="name" className="mb-2 ml-1 block">
                        Como você quer ser chamado(a)?
                    </Label>
                    <Input
                        autoComplete="name"
                        className="border-white"
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
                <RadioGroup className="mx-auto mb-6 w-72" name="gender">
                    <Label className="mb-2 ml-1 block" htmlFor="gender">Gênero (opcional)</Label>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem id="m" value="m" />
                        <Label htmlFor="m">Masculino</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem id="f" value="f" />
                        <Label htmlFor="f">Feminino</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem id="u" value="u" />
                        <Label htmlFor="u">Não selecionar</Label>
                    </div>
                </RadioGroup>
                <div className="mx-auto mb-6 w-72">
                    <Label className="mb-2 ml-1 block">
                        Qual etapa do PAS você vai fazer esse ano?
                    </Label>
                    <Select name="level" required>
                        <SelectTrigger className="border-white">
                            <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1ª etapa</SelectItem>
                            <SelectItem value="2">2ª etapa</SelectItem>
                            <SelectItem value="3">3ª etapa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="mx-auto mb-8 flex gap-2" disabled={loading}>
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
