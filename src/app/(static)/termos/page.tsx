import styles from '@/styles/content/Content.module.scss'

export default function Termos() {
    return (
        <main>
            <article className={styles.article}>
                <div className={styles.title}>
                    <h1>Termos de serviço</h1>
                    <span>Data de vigência: 15 de dezembro de 2023</span>
                </div>
                <p>Muito obrigado por usar o PAS Academy! Estes termos de serviço descrevem as regras e regulamentos para o uso desta plataforma, a fim de definir uma relação mútua entre o serviço e o usuário, caso deseje consultar a nossa <strong>política de privacidade</strong>, você pode fazê-lo <a href="/privacidade">clicando aqui</a></p>
            </article>
        </main>
    )
}