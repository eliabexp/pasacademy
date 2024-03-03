import { Body, Interactions, Title } from '@/layouts/Content'
import { marked, parseInline, use } from 'marked'
import { auth } from '@/lib/auth'
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
    ).then((res) => {
        if (!res.ok) notFound()

        return res.json()
    })

    return {
        title: content.title,
        description: content.content.slice(0, 150)
    }
}

export default async function Conteudo({ params: { materia, conteudo } }: ContentProps) {
    const cookie = headers().get('cookie') || ''
    const user = await auth()

    const content = await fetch(
        process.env.API_URL + `/contents?subject=${materia}&name=${conteudo}`,
        { headers: { cookie }, next: { revalidate: 0 } }
    ).then((res) => {
        if (!res.ok) notFound()

        return res.json()
    })

    const text = marked(content.content)
    const __html = text // Sanitize

    const likeCount = content.interactions.likes.length
    const liked =
        user &&
        content.interactions.likes.some(
            (like: { userId: string; date: Date }) => like.userId === user.id
        )

    return (
        <main className="p-4">
            <article className="mx-auto max-w-xl">
                <Title
                    title={content.title}
                    subtitle={`${content.subjectName} - ${content.level}º ano`}
                />
                {!content.public && (
                    <div className="mb-4 rounded-md bg-yellow-200 p-4">
                        <p className="text-sm text-yellow-900">
                            Este conteúdo está em processo de revisão e ainda não foi publicado.
                        </p>
                    </div>
                )}
                <Body dangerouslySetInnerHTML={{ __html }} />
                {content.public && (
                    <Interactions
                        id={content.id}
                        title={content.title}
                        likeCount={likeCount}
                        liked={liked}
                        saved={false}
                    />
                )}
            </article>
        </main>
    )
}
