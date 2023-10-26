import styles from './styles/Content.module.scss'
import InteractionButtons from './InteractionButtons'
import type { Content } from 'api' 
import { marked, use, type Tokens } from 'marked'
import { htmlEscape } from 'escape-goat'

use({ 
    extensions: [
        {
            name: 'overline',
            level: 'inline',
            start: (src: string) => src.match(/‾‾/)?.index,
            tokenizer(src: string) {
                const rule = /^‾‾(.*?)‾‾/
                const match = rule.exec(src)
                if(match) {
                    const token = {
                        type: 'overline',
                        raw: match[0],
                        text: match[1]
                    }
                    return token
                }
            },
            renderer(token: Tokens.Generic) {
                return `<span class="overline">${token.text}</span>`
            }
        },
        {
            name: 'sub',
            level: 'inline',
            start: (src: string) => src.match(/~/)?.index,
            tokenizer(src: string) {
                const rule = /^~(.*?)~/
                const match = rule.exec(src)
                if(match) {
                    const token = {
                        type: 'sub',
                        raw: match[0],
                        text: match[1]
                    }
                    return token
                }
            },
            renderer(token: Tokens.Generic) {
                return `<sub>${token.text}</sub>`
            }
        },
        {
            name: 'sup',
            level: 'inline',
            start: (src: string) => src.match(/\^/)?.index,
            tokenizer(src: string) {
                const rule = /^\^(.*?)\^/
                const match = rule.exec(src)
                if(match) {
                    const token = {
                        type: 'sup',
                        raw: match[0],
                        text: match[1],
                        tokens: []
                    }
                    return token
                }
            },
            renderer(token: Tokens.Generic) {
                return `<sup>${token.text}</sup>`
            }
        },
        {
            name: 'var',
            level: 'inline',
            start: (src: string) => src.match(/{{/)?.index,
            tokenizer(src: string) {
                const rule = /^{{(.*?)}}/
                const match = rule.exec(src)
                if(match) {
                    const token = {
                        type: 'var',
                        raw: match[0],
                        text: match[1],
                        tokens: []
                    }
                    const lexer = new marked.Lexer()
                    lexer.inlineTokens(token.text, token.tokens)

                    return token
                }
            },
            renderer(token: Tokens.Generic) {
                const parser = new marked.Parser()
                return `<var>${parser.parseInline(token.tokens || [])}</var>`
            }
        }
    ],
    renderer: {
        code(code, infostring) {
            return `<pre class=${styles[infostring as string]}>${marked.parseInline(code)}</pre>`
        },
        image(href, title, text) {
            return `<figure>
                <img src="${href}" alt="${text}">
                ${title ? `<figcaption>${title}</figcaption>` : ''}
            </figure>`
        },
        link(href, title, text) {
            if(href.startsWith('/')) {
                return `<a href="${href}">${text}</a>`
            }
            else {
                return `<a href="${href}" target="_blank" rel="external">${text}</a>`
            }
        }
    }
})

function renderContent(content: string) {
    const text = htmlEscape(content)

    return marked(text)
}

export default function Content({ data }: { data: Content }) {
    const contentRendered = renderContent(data.content)

    return (
        <article className={styles.article}>
            <h1>{data.title}</h1>
            <div id="content-settings">
                <label htmlFor="content">Conteúdo</label>
                <input type="checkbox" name="content" id="switch-resume"/>
            </div>
            <InteractionButtons/>
            <section className="content" dangerouslySetInnerHTML={{ __html: contentRendered }}/>
        </article>
    )
}