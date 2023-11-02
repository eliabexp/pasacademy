import '@/styles/page.scss'
import Logo from '@/components/main/Logo'
import Script from 'next/script'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
    const session = await getServerSession(authOptions)
    if(session) redirect('/inicio')

    return (
        <>
        <header>
            <Logo/>
            <a href="/login" id="join">Entrar</a>
        </header>
        <main>
            <section id="main">
                <div id="main-text">
                    <h1>Uma plataforma completa sobre o <span id="pas-text">PAS UnB.</span></h1>
                    <p>No PAS Academy você tem acesso completo a um material didático especialmente adaptado para otimizar seus estudos. Tudo de graça!</p>
                    <button id="enter">Acessar gratuitamente</button>
                </div>
                <picture>
                    <source media="(prefers-color-scheme: dark)" srcSet="/assets/images/platform-dark.jpg"/>
                    <img src="/assets/images/platform.jpg" alt="Print da interface da plataforma" draggable="false"/>
                </picture>
            </section>
            <section className="features">
                <picture>
                    <source media="(prefers-color-scheme: dark)" srcSet="/assets/images/questions-dark.jpg"/>
                    <img src="/assets/images/questions.jpg" alt="Imagem da tela de questões" draggable="false"/>
                </picture>
                <div className="text">
                    <h2>Seu caminho para a aprovação começa aqui</h2>
                    <p>Prepare-se ao máximo para o dia da prova com mais de 1000 questões de provas anteriores e exercícios personalizados.</p>
                </div>
            </section>
            <section className="features">
                <picture>
                    <source media="(prefers-color-scheme: dark)" srcSet="/assets/images/content-dark.jpg"/>
                    <img src="/assets/images/content.jpg" alt="Imagem da tela de Conteúdos" draggable="false"/>
                </picture>
                <div className="text">
                    <h2>Não perca mais tempo procurando o que estudar</h2>
                    <p>Reunimos todos os conteúdos e obras de cada ano com explicações, revisões e videoaulas para você ter tudo em um só lugar.</p>
                </div>
            </section>
            <section className="features">
                <picture>
                    <source media="(prefers-color-scheme: dark)" srcSet="/assets/images/roads-dark.jpg"/>
                    <img src="/assets/images/roads.jpg" alt="Demonstração da tela de trilhas" draggable="false"/>
                </picture>
                <div className="text">
                    <h2>Conheça a sua melhor versão de estudante</h2>
                    <p>Com o <a href="/plus">PAS Academy+</a>, você recebe uma trilha de estudos personalizada e exclusiva, feita especialmente para você!</p>
                </div>
            </section>
        </main>
        <footer>
            <div id="footer-container">
                <div id="social">
                    <Logo/>
                    <ul id="social-icons">
                        <a href="https://instagram.com/pasacademy" target="_blank" rel="external"><img src="/assets/icons/instagram.svg" alt="Instagram" width="28"/></a>
                        <a href="https://threads.net/@pasacademy" target="_blank" rel="external"><img src="/assets/icons/threads.svg" alt="Threads" width="28"/></a>
                        <a href="https://twitter.com/pasacademy" target="_blank" rel="external"><img src="/assets/icons/twitter-x.svg" alt="Twitter" width="28"/></a>
                    </ul>
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
                    <a href="/privacy">Política de Privacidade</a>
                    <a href="/terms">Termos de Serviço</a>
                </div>
            </div>
            <p id="copyright">PAS Academy © 2023</p>
        </footer>
        <Script src='js/landing.js'/>
        </>
    )
}
