'use client'

import styles from '@/styles/content/Content.module.scss'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import { generateHTML } from '@tiptap/html'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
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
            Mathematics,
            Placeholder.configure({
                emptyEditorClass: styles.emptyEditor,
                emptyNodeClass: styles.emptyNode,
                placeholder: ({ node }) => {
                    switch(node.type.name) {
                        case 'paragraph':
                            return 'Escreva algo incrível...'
                        case 'heading':
                            return 'Título'
                        default:
                            return 'Escreva algo incrível...'
                    }
                },
            })
        ],
        content: content,
        editable: editable,
        onUpdate({ editor }) {
            console.log(generateHTML(editor.getJSON(), [
                StarterKit.configure({
                    heading: {
                        levels: [2, 3]
                    }
                }),
                Mathematics
            ]))
        }
    })

    return (
        <>
        <EditorContent className={styles.content} editor={editor} />
        </>
    )
}