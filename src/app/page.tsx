import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import Script from 'next/script'
import auth from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const user = await auth()
    if (user) redirect('/inicio')

    return (
        <div className="absolute z-10 w-full bg-gradient-to-br from-primary via-blue-800 to-primary text-white">
            <header className="sticky top-0 z-20 mx-auto flex h-[60px] max-w-screen-2xl items-center justify-between px-6 transition-colors duration-200">
                <Logo color="white" />
                <Link href="/login" className="font-bold underline underline-offset-4">
                    Entrar
                </Link>
            </header>
            <main className="mx-auto max-w-screen-2xl px-6">
                <section className="flex flex-col gap-20 py-20 md:flex-row">
                    <div className="max-w-xl">
                        <h1 className="mb-4 text-4xl font-bold">
                            Uma plataforma completa sobre o PAS UnB.
                        </h1>
                        <p className="mb-16 leading-6">
                            No Pas Academy você tem acesso completo a um material didático criado
                            para otimizar suas preciosas horas de estudo. Tudo de graça!
                        </p>
                        <Link
                            href="/inicio"
                            className="inline-block rounded-2xl bg-white px-8 py-4 text-xl font-medium text-black transition-colors duration-300 hover:bg-white/80"
                        >
                            Acessar gratuitamente
                        </Link>
                    </div>
                    <div className="relative mx-auto h-[80svh] w-auto md:h-auto md:w-[60%] md:self-end">
                        <picture className="block h-full md:h-auto md:w-full">
                            <source media="(min-width: 768px)" srcSet="/assets/images/tv.png" />
                            <img
                                className="block h-full md:h-auto md:w-full"
                                src="/assets/images/smartphone.png"
                                alt="Imagem da tela do site"
                            />
                        </picture>
                        <video
                            src="/assets/images/download.mp4"
                            autoPlay
                            loop
                            muted
                            className="absolute left-[5%] top-[3%] -z-10 h-[95%] w-[90%] object-cover md:left-[0.5%] md:top-[1%] md:h-[87%] md:w-[99%]"
                        ></video>
                    </div>
                </section>
                <section className="px-6 py-16 md:flex md:justify-between md:gap-6">
                    <Image
                        className="rounded-lg md:w-[50%]"
                        src={'/assets/images/questions.jpg'}
                        alt="Captura da tela de questões"
                        width="1280"
                        height="720"
                        draggable="false"
                    />
                    <div className="">
                        <h2 className="my-4 text-2xl font-bold">
                            Seu caminho para a aprovação começa aqui
                        </h2>
                        <p className="leading-6">
                            Prepare-se ao máximo para o dia da prova com mais de 1000 questões de
                            provas anteriores e exercícios personalizados.
                        </p>
                    </div>
                </section>
                <section className="px-6 py-16 md:flex md:flex-row-reverse md:justify-between md:gap-6">
                    <Image
                        className="rounded-lg md:w-[50%]"
                        src={'/assets/images/content.jpg'}
                        alt="Captura da tela de conteúdos"
                        width="1280"
                        height="720"
                        draggable="false"
                    />
                    <div className="md:text-right">
                        <h2 className="my-4 text-2xl font-bold">
                            Não perca mais tempo procurando o que estudar
                        </h2>
                        <p>
                            Reunimos todos os conteúdos e obras de cada ano com explicações,
                            revisões e videoaulas para você ter tudo em um só lugar.
                        </p>
                    </div>
                </section>
                <section className="px-6 py-16 md:flex md:justify-between md:gap-6">
                    <Image
                        className="rounded-lg md:w-[50%]"
                        src={'/assets/images/content.jpg'}
                        alt="Captura da tela de trilhas"
                        width="1280"
                        height="720"
                        draggable="false"
                    />
                    <div className="">
                        <h2 className="my-4 text-2xl font-bold">
                            Conheça a sua melhor versão de estudante
                        </h2>
                        <p>
                            Ao <a href="/login">criar uma conta</a>, você recebe uma trilha de
                            estudos personalizada e exclusiva, feita especialmente para você!
                        </p>
                    </div>
                </section>
            </main>
            <footer className="mx-auto max-w-screen-2xl bg-slate-950 px-5 pb-2 pt-1.5">
                <div className="my-24 flex flex-col flex-wrap justify-between gap-8 lg:flex-row [&_h3]:font-bold">
                    <div>
                        <Logo color="white" />
                        <div className="mt-4 flex list-none flex-row items-center gap-4">
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
                <p className="m-2 select-none text-center">Pas Academy © 2024</p>
            </footer>
            <Script id="header-bg">{`
                const header = document.querySelector("header")
                document.addEventListener('scroll', () => {
                    if (window.scrollY > 0) {
                        header.classList.add('bg-black', 'bg-opacity-60')
                    } else {
                        header.classList.remove('bg-black', 'bg-opacity-60')
                    }
                })
            `}</Script>
        </div>
    )
}
