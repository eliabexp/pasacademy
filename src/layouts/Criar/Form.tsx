'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { tv } from 'tailwind-variants'

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
    options: {
        type?: string;
        title?: string;
        subject?: string;
        subjects?: string[];
        level?: number;
    }
    setOptions: React.Dispatch<React.SetStateAction<{
        type?: string;
        title?: string;
        subject?: string;
        subjects?: string[];
        level?: number;
    }>>
}

const div = tv({
    base: 'mx-auto w-4/5 transform transition-transform duration-500 ease-in-out md:w-96'
})

export default function Form({ className, options, setOptions }: FormProps) {
    const [type, setType] = useState(['content'])
    const [subject, setSubject] = useState([''])
    const [subjects, setSubjects] = useState([''])
    const [title, setTitle] = useState('')
    const [level, setLevel] = useState([''])

    let FormContent = <></>

    const subjectOptions = [
        { name: 'Português', value: 'portugues' },
        { name: 'Geografia', value: 'geografia' },
        { name: 'História', value: 'historia' },
        { name: 'Sociologia', value: 'sociologia' },
        { name: 'Filosofia', value: 'filosofia' },
        { name: 'Artes', value: 'artes' },
        { name: 'Inglês', value: 'ingles' },
        { name: 'Espanhol', value: 'espanhol' },
        { name: 'Francês', value: 'frances' },
        { name: 'Literatura', value: 'literatura' },
        { name: 'Matemática', value: 'matematica' },
        { name: 'Física', value: 'fisica' },
        { name: 'Quimica', value: 'quimica' },
        { name: 'Biologia', value: 'biologia' },
        { name: 'Obra do PAS', value: 'obras' }
    ]
    const levelOptions = [
        { name: '1º ano', value: '1' },
        { name: '2º ano', value: '2' },
        { name: '3º ano', value: '3' }
    ]

    switch (type[0]) {
        case 'content':
            FormContent = (
                <div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="title">
                            Título
                        </label>
                        <Input
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            id="title"
                            maxLength={96}
                            placeholder="Título do conteúdo"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="subject">
                            Matéria
                        </label>
                        <Select
                            id="subject"
                            placeholder="Selecione a matéria"
                            selected={subject}
                            setSelected={setSubject}
                            options={subjectOptions}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="level">
                            Ano
                        </label>
                        <Select
                            id="level"
                            selected={level}
                            setSelected={setLevel}
                            placeholder="Selecione o ano"
                            options={levelOptions}
                        />
                    </div>
                </div>
            )
            break
        case 'questions':
            FormContent = (
                <div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="subject">
                            Matérias
                        </label>
                        <Select
                            id="subject"
                            maxSelections={3}
                            placeholder="Selecione até 3 matérias"
                            selected={subjects}
                            setSelected={setSubjects}
                            options={subjectOptions}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="level">
                            Ano
                        </label>
                        <Select
                            id="level"
                            selected={level}
                            setSelected={setLevel}
                            placeholder="Selecione o ano"
                            options={levelOptions}
                        />
                    </div>
                </div>
            )
            break
        case 'roadmap':
            FormContent = (
                <div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="">
                            Nome da trilha
                        </label>
                        <Input type="text" />
                    </div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="subject">
                            Matérias
                        </label>
                        <Select
                            id="subject"
                            placeholder="Selecione até 3 matérias"
                            maxSelections={3}
                            selected={subjects}
                            setSelected={setSubjects}
                            options={subjectOptions}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="mb-2 block" htmlFor="level">
                            Ano
                        </label>
                        <Select
                            id="level"
                            selected={level}
                            setSelected={setLevel}
                            placeholder="Selecione o ano"
                            options={levelOptions}
                        />
                    </div>
                </div>
            )
            break
    }

    const ableToContinue = () => {
        switch (type[0]) {
            case 'content':
                return title && subject[0] && level[0] ? true : false
            case 'questions':
                return subjects[0] && level[0] ? true : false
            case 'roadmap':
                return title && subjects[0] && level[0] ? true : false
            default:
                return false
        }
    }

    return (
        <div className={div({ className })}>
            <div className="mb-8">
                <label className="mb-2 block" htmlFor="type">
                    O que você deseja criar?
                </label>
                <Select
                    id="type"
                    selected={type}
                    setSelected={setType}
                    options={[
                        { name: 'Conteúdo', value: 'content' },
                        { name: 'Questões', value: 'questions' },
                        { name: 'Trilha', value: 'roadmap' }
                    ]}
                />
            </div>
            {FormContent}
            <Button
                className="mx-auto mt-8"
                disabled={!ableToContinue()}
                onClick={() => {
                    setOptions({
                        type: type[0],
                        title: title,
                        subject: subject[0],
                        subjects: subjects,
                        level: parseInt(level[0])
                    })
                }}
            >
                Continuar
            </Button>
        </div>
    )
}
