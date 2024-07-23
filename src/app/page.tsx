import Image, { getImageProps } from 'next/image'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Logo from '@/components/ui/logo'
import Script from 'next/script'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await auth()
    if (session) redirect('/inicio')

    return (
        <div className="absolute z-10 w-full bg-gradient-to-br from-pasblue via-blue-800 to-pasblue text-white">
            <header className="sticky top-0 z-20 mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 transition-colors duration-200">
                <Logo color="white" />
                <Link href="/login" className="font-bold underline underline-offset-4">
                    Entrar
                </Link>
            </header>
            <main className="mx-auto max-w-screen-2xl px-6">
                <section className="flex flex-col gap-20 py-24 md:flex-row md:py-28">
                    <div className="max-w-xl">
                        <h1 className="mb-4 text-4xl font-bold">
                            Uma plataforma completa sobre o PAS UnB.
                        </h1>
                        <p className="mb-16 leading-6 md:mb-24">
                            No PAS Academy você tem acesso completo a um material didático criado
                            para otimizar suas preciosas horas de estudo. Tudo de graça!
                        </p>
                        <Button
                            className="rounded-2xl bg-white px-8 py-7 text-xl font-medium text-black"
                            asChild
                        >
                            <Link href="/inicio">Acessar gratuitamente</Link>
                        </Button>
                    </div>
                    <div className="relative mx-auto md:w-3/5 md:self-end">
                        <picture className="block h-full md:h-auto md:w-full">
                            <source
                                media="(min-width: 768px)"
                                srcSet={
                                    getImageProps({
                                        src: '/assets/images/inicio-pc.png',
                                        alt: '',
                                        width: 1280,
                                        height: 720
                                    }).props.srcSet
                                }
                            />
                            <Image
                                width="393"
                                height="793"
                                alt="Imagem da tela do site"
                                className="block size-full md:h-auto"
                                src="/assets/images/inicio.png"
                                priority
                            />
                        </picture>
                    </div>
                </section>
                <section className="px-8 py-16 md:flex md:justify-between md:gap-6">
                    <Image
                        className="rounded-lg md:w-1/2"
                        src="/assets/images/content.png"
                        alt="Captura da tela de questões"
                        width="720"
                        height="405"
                        draggable="false"
                    />
                    <div>
                        <h2 className="my-4 text-2xl font-bold">
                            Seu caminho para a aprovação começa aqui
                        </h2>
                        <p>
                            Prepare-se ao máximo para o dia da prova com mais de 1000 questões de
                            provas anteriores e exercícios personalizados.
                        </p>
                    </div>
                </section>
                <section className="px-8 py-16 md:flex md:flex-row-reverse md:justify-between md:gap-6">
                    <Image
                        className="rounded-lg md:w-1/2"
                        src="/assets/images/content.png"
                        alt="Captura da tela de conteúdos"
                        width="720"
                        height="405"
                        draggable="false"
                    />
                    <div className="md:text-right">
                        <h2 className="my-4 text-2xl font-bold">
                            Sem mais horas perdidas procurando o que estudar
                        </h2>
                        <p>
                            Reunimos todos os conteúdos e obras de cada ano com explicações,
                            revisões e videoaulas para você ter tudo em um só lugar.
                        </p>
                    </div>
                </section>
                <section className="px-8 py-16 md:flex md:justify-between md:gap-6">
                    <Image
                        className="rounded-lg md:w-1/2"
                        src="/assets/images/content.png"
                        alt="Captura da tela de trilhas"
                        width="720"
                        height="405"
                        draggable="false"
                    />
                    <div>
                        <h2 className="my-4 text-2xl font-bold">
                            Conheça a sua melhor versão de estudante
                        </h2>
                        <p>
                            Ao{' '}
                            <a className="underline underline-offset-2" href="/login">
                                criar sua conta
                            </a>
                            , você recebe uma trilha de estudos personalizada e exclusiva, feita
                            especialmente para você!
                        </p>
                    </div>
                </section>
                <section className="px-8 py-16 md:flex md:flex-row-reverse md:justify-between md:gap-6">
                    <Image
                        className="rounded-lg md:w-1/2"
                        src="/assets/images/content.png"
                        alt="Captura da tela de conteúdos"
                        width="720"
                        height="405"
                        draggable="false"
                    />
                    <div className="md:text-right">
                        <h2 className="my-4 text-2xl font-bold">
                            Cada conteúdo com a profundidade que você precisa
                        </h2>
                        <p>
                            Aqui você tem cada conteúdo por completo, para percorrer a fundo ou
                            apenas fazer uma revisão.
                        </p>
                    </div>
                </section>
            </main>
            <footer className="mx-auto max-w-screen-2xl bg-slate-950 px-5 pb-2 pt-1.5">
                <div className="my-24 flex flex-col flex-wrap justify-between gap-8 lg:flex-row [&_h3]:font-bold">
                    <div>
                        <Logo color="white" />
                        <div className="mt-4 flex items-center gap-4">
                            <a
                                href="https://instagram.com/pasacademy"
                                target="_blank"
                                rel="external"
                            >
                                <Image
                                    src="/assets/icons/instagram.svg"
                                    alt="Instagram"
                                    width="28"
                                    height="28"
                                />
                            </a>
                            <a href="https://twitter.com/pasacademy" target="_blank" rel="external">
                                <Image
                                    src="/assets/icons/twitter-x.svg"
                                    alt="Twitter"
                                    width="28"
                                    height="28"
                                />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3>Links</h3>
                        <ul>
                            <li>
                                <a href="/professor">Sou professor</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Contato</h3>
                        <ul>
                            <li>
                                <a
                                    href="mailto:contato@pasacademy.com.br"
                                    target="_blank"
                                    rel="external"
                                >
                                    E-mail
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Dados</h3>
                        <ul>
                            <li>
                                <a href="/privacidade">Política de Privacidade</a>
                            </li>
                            <li>
                                <a href="/termos">Termos de Serviço</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <span className="m-2 block select-none text-center">PAS Academy © 2024</span>
            </footer>
            <Script id="header-bg">{`
                const header = document.querySelector("header")
                document.addEventListener('scroll', () => {
                    if (window.scrollY > 0) {
                        header.classList.add('bg-pasblue')
                    } else {
                        header.classList.remove('bg-pasblue')
                    }
                })
            `}</Script>
        </div>
    )
}
