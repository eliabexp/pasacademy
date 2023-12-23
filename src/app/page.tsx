import '@/styles/page.scss'

import styles from '@/styles/Page.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/main/Logo'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await auth()
    if(session && session.user.registered) redirect('/inicio')

    return (
        <>
            <header className={styles.header}>
                <Logo color="white" />
                <Link href="/login" id="join">Entrar</Link>
            </header>
            <main>
                <section className={styles.hero}>
                    <div id="main-text">
                        <h1>Uma plataforma completa sobre o <span id="pas-text">PAS UnB.</span></h1>
                        <p>No PAS Academy você tem acesso completo a um material didático criado para otimizar suas preciosas horas de estudo. Tudo de graça!</p>
                        <Link href="/inicio" id="enter">Acessar gratuitamente</Link>
                    </div>
                    <picture>
                        <source media="(min-width: 768px)" srcSet="/assets/images/platform-dark.jpg" />
                        <img src="/assets/images/smartphone.png" alt="Print da interface da plataforma" draggable="false" />
                    </picture>
                </section>
                <section className={styles.section}>
                    <picture>
                        <source media="(prefers-color-scheme: dark)" srcSet="/assets/images/questions-dark.jpg" />
                        <img src="/assets/images/questions.jpg" alt="Imagem da tela de questões" draggable="false" />
                    </picture>
                    <div className="text">
                        <h2>Seu caminho para a aprovação começa aqui</h2>
                        <p>Prepare-se ao máximo para o dia da prova com mais de 1000 questões de provas anteriores e exercícios personalizados.</p>
                    </div>
                </section>
                <section className={styles.section}>
                    <picture>
                        <source media="(prefers-color-scheme: dark)" srcSet="/assets/images/content-dark.jpg" />
                        <img src="/assets/images/content.jpg" alt="Imagem da tela de Conteúdos" draggable="false" />
                    </picture>
                    <div className="text">
                        <h2>Não perca mais tempo procurando o que estudar</h2>
                        <p>Reunimos todos os conteúdos e obras de cada ano com explicações, revisões e videoaulas para você ter tudo em um só lugar.</p>
                    </div>
                </section>
                <section className={styles.section}>
                    <picture>
                        <source media="(prefers-color-scheme: dark)" srcSet="/assets/images/roads-dark.jpg" />
                        <img src="/assets/images/roads.jpg" alt="Demonstração da tela de trilhas" draggable="false" />
                    </picture>
                    <div className="text">
                        <h2>Conheça a sua melhor versão de estudante</h2>
                        <p>Ao <a href="/login">criar uma conta</a>, você recebe uma trilha de estudos personalizada e exclusiva, feita especialmente para você!</p>
                    </div>
                </section>
            </main>
            <footer className={styles.footer}>
                <div>
                    <div className={styles.socialLinks}>
                        <Logo />
                        <div>
                            <a href="https://instagram.com/pasacademy" target="_blank" rel="external"><Image src="/assets/icons/instagram.svg" alt="Instagram" width="28" height="28" /></a>
                            <a href="https://twitter.com/pasacademy" target="_blank" rel="external"><Image src="/assets/icons/twitter-x.svg" alt="Twitter" width="28" height="28" /></a>
                        </div>
                    </div>
                    <div>
                        <h3>Links</h3>
                        <a href="/professor">Sou professor</a>
                    </div>
                    <div>
                        <h3>Contato</h3>
                        <a href="mailto:contato@pasacademy.com.br" target="_blank" rel="external">E-mail</a>
                    </div>
                    <div>
                        <h3>Dados</h3>
                        <a href="/privacidade">Política de Privacidade</a>
                        <a href="/termos">Termos de Serviço</a>
                    </div>
                </div>
                <p id="copyright">PAS Academy © 2023</p>
            </footer>
        </>
    )
}
