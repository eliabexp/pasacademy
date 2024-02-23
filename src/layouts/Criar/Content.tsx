import { Editor } from '@/components/tools/Editor'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

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

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    options: Options
    setOptions: React.Dispatch<React.SetStateAction<Options>>
}

function publishContent(options: Options, output: string) {
    // Collect data urls and replace it with "file" placeholders
    const files: string[] = []
    let content = output.replace(/!\[(.*)\]\((.*?)\)/g, (match, alt, src) => {
        files.push(src)
        return `![${alt}](file${files.length - 1})`
    })

    return fetch('/api/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...options, content, files })
    }).then((res) => {
        if (!res.ok) {
            if (res.status === 409)
                return toast.error('Conteúdo já existe', {
                    description:
                        'Esse conteúdo já existe, tente enviá-lo novamente utilizando um nome diferente.'
                })

            return toast.error('Algo deu errado', {
                description:
                    'Poxa, alguma coisa deu errado na hora de enviar o seu conteúdo, poderia revisar e tentar de novo? 🥺'
            })
        }

        window.sessionStorage.removeItem('editorContent')

        toast.success('Parabéns! 🎉', {
            description:
                'Seu conteúdo foi enviado com sucesso, em breve ele estará disponível para ajudar a todos nos seus estudos!',
            duration: 8000
        })
    })
}

export default function CreateContent({ className, options, setOptions }: ContentProps) {
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    return (
        <div className={className}>
            <Editor className="mx-auto mb-8" editable setOutput={setOutput} />
            <div className="mx-auto flex max-w-2xl justify-end gap-4">
                <Button onClick={() => setOptions({})} variant="ghost">
                    Voltar
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button disabled={output.length < 96 || loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Publicar'}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Publicar conteúdo?</AlertDialogTitle>
                            <AlertDialogDescription>
                                O conteúdo será revisado e num passe de mágica estará disponível
                                para todos lerem!
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Dar mais uma olhada</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    setLoading(true)
                                    publishContent(options, output).finally(() => setLoading(false))
                                    router.push('/perfil')
                                }}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Publicar'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}
