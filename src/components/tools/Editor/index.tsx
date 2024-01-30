'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import { Markdown } from 'tiptap-markdown'
import { Body } from '@/layouts/Content'
import { Bold, Flower2, Italic, Link as LinkIcon, MoreHorizontal, Sigma } from 'lucide-react'
import { useState } from 'react'
import 'katex/dist/katex.min.css'
import { tv } from 'tailwind-variants'

interface EditorProps {
    className?: string
    content?: string
    editable?: boolean
    outputRef?: React.MutableRefObject<string>
}

const button = tv({
    base: 'flex gap-2 rounded-lg px-1 py-0.5 transition-colors md:hover:bg-hover md:dark:hover:bg-hover-dark',
    variants: {
        active: {
            true: 'bg-hover dark:bg-hover-dark'
        }
    }
})
const options = tv({
    base: 'absolute -top-full right-0 hidden',
    variants: {
        isOptionsOpen: {
            true: 'flex'
        }
    }
})

export default function Editor({ className, content = '', editable = false, outputRef }: EditorProps) {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'min-h-[70svh] outline-none px-1 pb-5'
            }
        },
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3]
                },
                strike: false
            }),
            CharacterCount.configure({
                limit: 16384
            }),
            Link,
            Markdown.configure({
                transformPastedText: true
            }),
            Mathematics,
            Placeholder.configure({
                emptyEditorClass:
                    'before:content-[attr(data-placeholder)] before:text-[#808080] before:float-left before:pointer-events-none before:h-0',
                emptyNodeClass:
                    'before:content-[attr(data-placeholder)] before:text-[#808080] before:float-left before:pointer-events-none before:h-0',
                placeholder: ({ node }) => {
                    switch (node.type.name) {
                        case 'codeBlock':
                            if (node.attrs.language === 'formula') return ''
                            if (node.attrs.language === 'poem') return 'Cole seu lindo poema'
                        case 'paragraph':
                            return 'Escreva algo incrível...'
                        case 'heading':
                            if (node.attrs.level === 2) return 'Título'
                            if (node.attrs.level === 3) return 'Subtítulo'
                        default:
                            return 'Escreva algo incrível...'
                    }
                }
            }),
            Table.configure({
                resizable: true
            }),
            TableCell,
            TableHeader,
            TableRow
        ],
        content: content || window.sessionStorage.getItem('editorContent'),
        editable: editable,
        onUpdate({ editor }) {
            window.sessionStorage.setItem('editorContent', editor.getHTML())

            const markdownOutput = editor.storage.markdown.getMarkdown()
            if (outputRef) outputRef.current = markdownOutput
        }
    })

    const [isOptionsOpen, setIsOptionsOpen] = useState(false) // Editor options

    return (
        <Body className={className}>
            {editor && (
                <>
                    <BubbleMenu
                        className="flex items-center gap-1 rounded-lg border p-1"
                        editor={editor}
                    >
                        <button onClick={() => editor.chain().focus().toggleBold().run()}>
                            <Bold size="20" />
                        </button>
                        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                            <Italic size="20" />
                        </button>
                    </BubbleMenu>
                    <EditorContent editor={editor} />
                    <div className="absolute bottom-2 left-1/2 mx-auto flex h-5 -translate-x-1/2 items-center gap-4 rounded-xl border bg-hover p-4 dark:bg-bg-dark">
                        <button
                            className={button({ active: editor.isActive('bold') })}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                        >
                            <Bold size="20" />
                        </button>
                        <button
                            className={button({ active: editor.isActive('italic') })}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                        >
                            <Italic size="20" />
                        </button>
                        <button
                            className={button({ active: editor.isActive('heading', { level: 2 }) })}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        >
                            Título
                        </button>
                        <button
                            className={button({ active: editor.isActive('heading', { level: 3 }) })}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        >
                            Subtítulo
                        </button>
                        <button
                            className={button({ active: editor.isActive('heading', { level: 3 }) })}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        >
                            <LinkIcon size="20" />
                        </button>
                        <button
                            className={button({ active: isOptionsOpen })}
                            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                        >
                            <MoreHorizontal />
                        </button>
                        <div className={options({ isOptionsOpen })}>
                            <button
                                className={button({
                                    active: editor.isActive('codeBlock', { language: 'formula' })
                                })}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleCodeBlock({ language: 'formula' })
                                        .run()
                                }
                            >
                                <Sigma /> Fórmula
                            </button>
                            <button
                                className={button({
                                    active: editor.isActive('codeBlock', { language: 'poem' })
                                })}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleCodeBlock({ language: 'poem' })
                                        .run()
                                }
                            >
                                <Flower2 /> Poema
                            </button>
                        </div>
                    </div>
                </>
            )}
        </Body>
    )
}
