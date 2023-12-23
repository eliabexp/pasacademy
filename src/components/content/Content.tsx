import styles from '@/styles/content/Content.module.scss'
import markedKatex from 'marked-katex-extension'
import { roboto_serif } from '@/app/fonts'
import { marked, use } from 'marked'
import { htmlEscape } from 'escape-goat'
import { type Content } from '@/models/content'

// Marked configuration
use(markedKatex({ output: 'mathml' }))
use({
    renderer: {
        code(code, infostring) {
            // Apply div styles
            let className = ''
            switch(infostring) {
                case 'poem':
                    className = `${styles.poem} ${roboto_serif.className}`
                    break
                case 'formula':
                    className = `${styles.formula}`
                    break
            }

            const lines = code.split('\n').filter((line) => line.length > 0).map((line, index) => {
                if(!line.trim()) return
                return marked.parseInline(line)
            })
            console.log(className)

            return `<pre class=${className}>${lines.join('\n')}</pre>`
        },
        image(href, title, text) {
            return `
                <figure>
                    <img src="${href}" alt="${text}">
                    ${title ? `<figcaption>${title}</figcaption>` : ''}
                </figure>
            `
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
    const __html = marked(text) as string // Parse

    return (
        <>
        <div className={styles.title}>
            <h1>{data.title}</h1>
            <span>{data.subjectTitle} - {data.level + 'º ano'}</span>
        </div>
        <article className={styles.content}>
            <section dangerouslySetInnerHTML={{ __html }} />
        </article>
        </>
    )
}