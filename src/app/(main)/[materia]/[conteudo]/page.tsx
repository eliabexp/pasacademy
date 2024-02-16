import { Body, Title } from '@/components/ui/content'
import { marked, parseInline, use } from 'marked'
import { headers } from 'next/headers'
import { htmlEscape } from 'escape-goat'
import katex from 'marked-katex-extension'
import { notFound } from 'next/navigation'

interface Content {
    params: { materia: string; conteudo: string }
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
                    ${text ? `<figcaption>${text}</figcaption>` : ''}
                </figure>
            `
        },
        link(href, title, text) {
            if (href.startsWith('/')) return `<a href="${href}">${text}</a>`

            return `<a href="${href}" target="_blank" rel="external">${text}</a>`
        }
    }
})

export default async function Conteudo({ params: { materia, conteudo } }: Content) {
    const cookie = headers().get('cookie') || ''

    const content = await fetch(
        process.env.API_URL + `/contents?subject=${materia}&name=${conteudo}`,
        { headers: { cookie }, next: { revalidate: 600 } }
    ).then(async (res) => {
        if (!res.ok) notFound()

        return await res.json()
    })

    let text = htmlEscape(content.content)
    text = text.replace(/^&gt; /gm, '>') // recover > to blockquote tags work properly
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
