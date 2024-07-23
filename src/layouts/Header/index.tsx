import Logo from '@/components/ui/logo'
import { Header as CriarHeader } from '@/layouts/Criar'
import { Header as InicioHeader } from '@/layouts/Inicio'
import { Header as ObrasHeader } from '@/layouts/Obras'
import { Header as PerfilHeader } from '@/layouts/Perfil'
import { Header as QuestoesHeader } from '@/layouts/Questoes'

export default function Header({ page }: { page: string }) {
    // Custom header for each page
    const header: { [key: string]: React.ReactElement } = {
        inicio: <InicioHeader />,
        obras: <ObrasHeader />,
        questoes: <QuestoesHeader />,
        perfil: <PerfilHeader />,
        criar: <CriarHeader />
    }

    return (
        <header className="sticky top-0 z-20 col-span-2 mx-auto flex h-16 w-full items-center justify-between bg-background px-4 print:hidden">
            <Logo className="hidden pl-4 md:flex md:shrink-0 md:basis-56" />
            {header[page]}
        </header>
    )
}
