import { Body, Interactions, Title } from '@/layouts/Content'
import { marked, parseInline, use } from 'marked'
import { headers } from 'next/headers'
import katex from 'marked-katex-extension'
import { notFound } from 'next/navigation'

interface ContentProps {
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
        heading(text, level) {
            return `<h${level} id="${text
                .toLowerCase()
                .normalize('NFD')
                .replace(/[^a-z0-9]/g, '')}">${text}</h${level}>`
        },
        image(src, title, text) {
            return `
                <figure>
                    <img src="${src}" alt="${text}">
                    ${text ? `<figcaption>${text}</figcaption>` : ''}
                </figure>
            `
        },
        link(href, title, text) {
            if (href.startsWith('/')) return `<a href="${href}">${text}</a>`

            return `<a href="${href}" target="_blank" rel="external">${text}</a>`
        },
        table(header, body) {
            return `
                <div class="tableWrapper">
                    <table>
                        ${header}
                        ${body}
                    </table>
                </div>
            `
        }
    }
})

export const generateMetadata = async ({ params: { materia, conteudo } }: ContentProps) => {
    const cookie = headers().get('cookie') || ''

    const content = await fetch(
        process.env.API_URL + `/contents?subject=${materia}&name=${conteudo}`,
        { headers: { cookie } }
    ).then(async (res) => {
        if (!res.ok) notFound()

        return await res.json()
    })

    return {
        title: content.title,
        description: content.content.slice(0, 150)
    }
}

export default async function Conteudo({ params: { materia, conteudo } }: ContentProps) {
    const cookie = headers().get('cookie') || ''

    const content = await fetch(
        process.env.API_URL + `/contents?subject=${materia}&name=${conteudo}`,
        { headers: { cookie }, next: { revalidate: 0 } }
    ).then(async (res) => {
        if (!res.ok) notFound()

        return await res.json()
    })

    const text = marked(content.content)
    const __html = text // Sanitize

    return (
        <main className="mx-auto p-4">
            <Title
                title={content.title}
                subtitle={`${content.subjectName} - ${content.level}º ano`}
            />
            <Body dangerouslySetInnerHTML={{ __html }} />
            {content.status === 'public' && (
                <Interactions id={content.id} title={content.title} liked />
            )}
        </main>
    )
}
