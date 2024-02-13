'use client'

import { useContext, useState } from 'react'
import { LayoutContext } from '@/app/(main)/layout'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { tv } from 'tailwind-variants'

const form = tv({
    base: 'mx-auto w-4/5 transition-transform duration-500 ease-in-out md:w-96',
    variants: {
        hide: {
            true: 'hidden scale-0'
        }
    }
})

interface Options {
    type?: string | undefined
    title?: string | undefined
    subject?: string | undefined
    subjects?: string[] | undefined
    level?: number | undefined
}

interface FormProps {
    options: Options
    setOptions: React.Dispatch<React.SetStateAction<Options>>
}

function SubjectSelect() {
    return (
        <Select name="subject">
            <SelectTrigger>
                <SelectValue placeholder="Selecione uma matéria" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
                <SelectGroup>
                    <SelectLabel>Linguagens</SelectLabel>
                    <SelectItem value="portugues">Português</SelectItem>
                    <SelectItem value="ingles">Inglês</SelectItem>
                    <SelectItem value="espanhol">Espanhol</SelectItem>
                    <SelectItem value="frances">Francês</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Ciências Humanas</SelectLabel>
                    <SelectItem value="geografia">Geografia</SelectItem>
                    <SelectItem value="historia">História</SelectItem>
                    <SelectItem value="sociologia">Sociologia</SelectItem>
                    <SelectItem value="filosofia">Filosofia</SelectItem>
                    <SelectItem value="artes">Artes</SelectItem>
                    <SelectItem value="literatura">Literatura</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Ciências Exatas</SelectLabel>
                    <SelectItem value="matematica">Matemática</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                    <SelectItem value="biologia">Biologia</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Obras</SelectLabel>
                    <SelectItem value="obras">Obra do PAS</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function LevelSelect() {
    return (
        <>
            <label className="mb-2 block" htmlFor="level">
                Ano
            </label>
            <Select name="level" required>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1º ano</SelectItem>
                    <SelectItem value="2">2º ano</SelectItem>
                    <SelectItem value="3">3º ano</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}

export default function CreateForm({ options, setOptions }: FormProps) {
    const [type, setType] = useState('content')
    const [subject, setSubject] = useState([''])
    const [subjects, setSubjects] = useState([''])

    const { layout, setLayout } = useContext(LayoutContext)

    const contentForm = () => (
        <div>
            <div className="mb-8">
                <Label className="mb-2 block" htmlFor="subject">
                    Matéria
                </Label>
                <SubjectSelect />
            </div>
            <div className="mb-8">
                <Label className="mb-2 block" htmlFor="title">
                    Título
                </Label>
                <Input
                    maxLength={96}
                    id="title"
                    name="title"
                    placeholder="Título do conteúdo"
                    type="text"
                    required
                />
            </div>
            <div className="mb-8">
                <LevelSelect />
            </div>
        </div>
    )
    const questionsForm = () => (
        <div>
            <div className="mb-8">
                <Label className="mb-2 block" htmlFor="subject">
                    Matérias
                </Label>
                <SubjectSelect />
            </div>
            <div className="mb-8">
                <LevelSelect />
            </div>
        </div>
    )
    const roadmapForm = () => (
        <div>
            <div className="mb-8">
                <Label className="mb-2 block" htmlFor="title">
                    Nome da trilha
                </Label>
                <Input type="text" name="title" id="title" />
            </div>
            <div className="mb-8">
                <Label className="mb-2 block" htmlFor="subject">
                    Matérias
                </Label>
                <SubjectSelect />
            </div>
            <div className="mb-8">
                <LevelSelect />
            </div>
        </div>
    )

    return (
        <form
            className={form({ hide: !!options.type })}
            onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const data = Object.fromEntries(formData.entries())
                setOptions({ ...data })
                setLayout &&
                    setLayout({
                        ...layout,
                        createHeader: { title: data.title, level: `${data.level}º ano` }
                    })
            }}
        >
            <div className="mb-8">
                <Label className="mb-2 block">O que você deseja criar?</Label>
                <Select
                    defaultValue="content"
                    name="type"
                    onValueChange={(value) => setType(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="content">Conteúdo</SelectItem>
                        <SelectItem value="questions">Questões</SelectItem>
                        <SelectItem value="roadmap">Trilha</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {type === 'content' && contentForm()}
            {type === 'questions' && questionsForm()}
            {type === 'roadmap' && roadmapForm()}
            <Button className="mx-auto mt-8 block">Continuar</Button>
        </form>
    )
}
