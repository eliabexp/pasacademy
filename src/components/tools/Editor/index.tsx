'use client'

import BubbleMenu from '@tiptap/extension-bubble-menu'
import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import { Body } from '@/layouts/Content'
import 'katex/dist/katex.min.css'

interface EditorProps {
    content?: string
    editable?: boolean
}

export default function Editor({ content = '', editable = false }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3]
                }
            }),
            CharacterCount.configure({
                limit: 16384
            }),
            Link,
            Mathematics,
            Placeholder.configure({
                emptyEditorClass:
                    'before:content-[attr(data-placeholder)] before:text-[#808080] before:float-left before:pointer-events-none before:h-0',
                emptyNodeClass:
                    'before:content-[attr(data-placeholder)] before:text-[#808080] before:float-left before:pointer-events-none before:h-0',
                placeholder: ({ node }) => {
                    switch (node.type.name) {
                        case 'paragraph':
                            return 'Escreva algo incrível...'
                        case 'heading':
                            return 'Título'
                        default:
                            return 'Escreva algo incrível...'
                    }
                }
            })
        ],
        content: content,
        editable: editable,
        onUpdate({ editor }) {}
    })

    return (
        <Body className="min-h-80">
            <EditorContent editor={editor} />
        </Body>
    )
}
