import styles from './styles/Content.module.scss'
import InteractionButtons from './InteractionButtons'
import markedKatex from 'marked-katex-extension'
import { type Content } from '@/models/content'
import { marked, use } from 'marked'
import { htmlEscape } from 'escape-goat'

// Marked configuration
use(markedKatex({ output: 'mathml' }))
use({
    renderer: {
        code(code, infostring) {
            const className = infostring ? styles[infostring as string] : ''
            return `<pre class=${className}>${marked.parseInline(code)}</pre>`
        },
        image(href, title, text) {
            return `<figure>
                <img src="${href}" alt="${text}">
                ${title ? `<figcaption>${title}</figcaption>` : ''}
            </figure>`
        },
        link(href, title, text) {
            if(href.startsWith('/')) return `<a href="${href}">${text}</a>`

            return `<a href="${href}" target="_blank" rel="external">${text}</a>`
        }
    }
})

export default function Content({ data }: { data: Content }) {
    // Render the content
    const text = htmlEscape(data.content) // Sanitize
    const __html = marked(text) // Parse

    return (
        <article className={styles.article}>
            <div id={styles.title}>
                <h1>{data.title}</h1>
                <span>{data.subjectTitle} - {data.level + 'º ano'}</span>
            </div>
            <section dangerouslySetInnerHTML={{ __html }}/>
        </article>
    )
}