import { Header as InicioHeader } from '@/layouts/Inicio'
import { Header as ObrasHeader } from '@/layouts/Obras'
import { Header as QuestoesHeader } from '@/layouts/Questoes'
import { Header as TrilhasHeader } from '@/layouts/Trilhas'
import { Header as ComunidadeHeader } from '@/layouts/Comunidade'
import { Header as PerfilHeader } from '@/layouts/Perfil'
import { Header as CriarHeader } from '@/layouts/Criar'
import Logo from '@/components/ui/Logo'

export default function Header({ page }: { page: string }) {
    // Custom header for each page
    const header: { [key: string]: React.ReactElement } = {
        inicio: <InicioHeader />,
        obras: <ObrasHeader />,
        questoes: <QuestoesHeader />,
        trilhas: <TrilhasHeader />,
        perfil: <PerfilHeader />,
        comunidade: <ComunidadeHeader />,
        criar: <CriarHeader />
    }

    return (
        <header className="sticky top-0 z-20 mx-auto flex h-16 max-w-screen-2xl items-center justify-between bg-bg px-0 dark:bg-bg-dark">
            <Logo className="hidden justify-center md:flex md:shrink-0 md:basis-60" />
            {header[page]}
        </header>
    )
}
