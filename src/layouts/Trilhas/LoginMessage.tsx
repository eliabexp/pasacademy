import Button from '@/components/ui/Button'

export default function LoginMessage() {
    return (
        <main className="p-4">
            <h1 className="my-4 text-2xl font-bold">
                Acesse sua conta para poder visualizar suas trilhas
            </h1>
            <p className="mb-12">
                Com as trilhas você pode criar rotinas de estudo, ter resumos com base nos conteúdos
                que você estuda e muito mais!
            </p>
            <Button>
                <a href="/login">Fazer login</a>
            </Button>
        </main>
    )
}
