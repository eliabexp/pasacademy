import Editor from '@/components/tools/Editor'
import { ContentForm } from '@/layouts/Criar'

export default function Criar() {
    return (
        <main className="flex-1 p-4">
            <ContentForm />
            <Editor editable />
        </main>
    )
}
