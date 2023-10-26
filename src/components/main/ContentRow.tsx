import styles from './styles/ContentRow.module.scss'
import Image from 'next/image'

export default function ContentRow() {
    return (
        <section className={styles.contents}>
            <h2>Conteúdos novos</h2>
            <ul>
                <li><button><img src={'https://placehold.it/1280x720/white'} alt={''}/>{'Nome do conteúdo'}</button></li>
                <li><button><img src={'https://placehold.it/1280x720/white'} alt={''}/>{'Nome do conteúdo'}</button></li>
                <li><button><img src={'https://placehold.it/1280x720/white'} alt={''}/>{'Nome do conteúdo'}</button></li>
                <li><button><img src={'https://placehold.it/1280x720/white'} alt={''}/>{'Nome do conteúdo'}</button></li>
            </ul>
        </section>
    )
}