import { Body, Title } from '@/layouts/Content'
import { notFound } from 'next/navigation'
import { marked, parseInline, use } from 'marked'
import { htmlEscape } from 'escape-goat'
import katex from 'marked-katex-extension'

interface Content {
    params: { [key: string]: string }
}

use(katex({ output: 'mathml' }))
use({
    breaks: true,
    gfm: true,
    renderer: {
        code(code, infostring) {
            let className = ''
            switch (infostring) {
                case 'formula':
                    className = 'language-formula'
                    break
            }

            return `<pre class="${className}">${parseInline(code)}</pre>`
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
            if (href.startsWith('/')) return `<a href="${href}">${text}</a>`

            return `<a href="${href}" target="_blank" rel="external">${text}</a>`
        }
    }
})

export default async function Conteudo({ params }: Content) {
    const { materia, conteudo } = params

    const content = await fetch(
        process.env.API_URL + `/contents?subject=${materia}&name=${conteudo}`,
        { credentials: 'same-origin', next: { revalidate: 600 } }
    ).then(async (res) => {
        if (!res.ok) notFound()

        return await res.json()
    })

    const text = htmlEscape(content.content) // Sanitize
    const __html = marked(text) as string // Parse

    return (
        <main className="mx-auto p-4">
            <Title
                title={content.title}
                subtitle={`${content.subjectTitle} - ${content.level}º ano`}
            />
            <Body dangerouslySetInnerHTML={{ __html }} />
        </main>
    )
}
