import styles from '@/styles/main/Create.module.scss'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import Editor from '@/components/tools/Editor'
import { Search } from 'lucide-react'

function CreateOptions() {
    return (
        <div className={styles.createOptions}>
        </div>
    )
}

function CreateContentForm() {
    return (
        <div>
            <label htmlFor="title">Título do conteúdo</label>
            <input type="text" id="title" placeholder='Progressão Aritmética' />
            <label htmlFor="subject">Matéria</label>
            <select id="subject">
                <option disabled hidden>Selecione uma matéria</option>
                <option value="portugues">Português</option>
                <option value="geografia">Geografia</option>
                <option value="historia">História</option>
                <option value="filosofia">Filosofia</option>
                <option value="sociologia">Sociologia</option>
                <option value="artes">Artes</option>
                <option value="ingles">Inglês</option>
                <option value="espanhol">Espanhol</option>
                <option value="literatura">Literatura</option>
                <option value="matematica">Matemática</option>
                <option value="fisica">Física</option>
                <option value="quimica">Química</option>
                <option value="biologia">Biologia</option>
                <option value="obras">Obras</option>
            </select>
            <label htmlFor="level">Ano</label>
            <select id="level">
                <option disabled hidden>Selecione o ano</option>
                <option value="1">1º ano</option>
                <option value="2">2º ano</option>
                <option value="3">3º ano</option>
            </select>
        </div>
    )
}

export default function Criar() {
    return (
        <>
            <header>
                <div></div>
                <div>
                    <Button styleType='soft'>Salvar rascunho</Button>
                    <Button styleType='solid'>Publicar</Button>
                </div>
            </header>
            <main>
                <Editor editable />
                {/* <CreateOptions /> */}
                {/* <CreateContentForm /> */}
                {/* <CreateContent title='Progressão aritmética' subject='Matemática' level='1'/> */}
            </main>
        </>
    )
}