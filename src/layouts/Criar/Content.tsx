import Editor from '@/components/tools/Editor'
import Button from '@/components/ui/Button'
import { Suspense, useRef } from 'react'

interface Options {
    type?: string | undefined
    title?: string | undefined
    subject?: string | undefined
    subjects?: string[] | undefined
    level?: number | undefined
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    options: Options
    setOptions: React.Dispatch<React.SetStateAction<Options>>
}

export default function CreateContent({ className, options, setOptions }: ContentProps) {
    const output = useRef('')

    return (
        <div className={className}>
            <Editor className="mb-8" editable outputRef={output} />
            <div className="mx-auto flex max-w-2xl justify-end gap-4">
                <Button onClick={() => setOptions({ ...options, type: '' })} variant="ghost">
                    Voltar
                </Button>
                <Button
                    onClick={() => {
                        const body = {
                            name: options.title?.toLowerCase().replace(/\s/g, ''),
                            title: options.title,
                            subject: options.subject,
                            level: options.level,
                            content: output.current
                        }
                        fetch('/api/contents', {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body),
                            method: 'POST'
                        })
                    }}
                    type="submit"
                >
                    Publicar
                </Button>
            </div>
        </div>
    )
}
