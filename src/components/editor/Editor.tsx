'use client'

import CharacterCount from '@tiptap/extension-character-count'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { EditorContent, type Editor as EditorType, useEditor } from '@tiptap/react'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import { Markdown } from 'tiptap-markdown'
import { Body } from '@/layouts/Content'
import BubbleMenu from '@/components/editor/BubbleMenu'
import CommandBar from '@/components/editor/CommandBar'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import 'katex/dist/katex.min.css'

interface EditorProps {
    className?: string
    content?: string
    editable?: boolean
    outputRef?: React.MutableRefObject<string>
    setOutput?: React.Dispatch<React.SetStateAction<string>>
}

async function uploadFile(file: File | null, currentEditor: EditorType) {
    if (!file) return
    const alt = ''
    // TODO: Add alt text input

    if (file.size > 1024 * 1024 * 5)
        return toast.error('Este arquivo é muito grande', {
            description: 'O arquivo deve ter no máximo 5MB'
        })

    const formData = new FormData()
    formData.append('file', file)

    const { signedUrl, filePath } = await fetch('/api/attachments', {
        method: 'POST',
        body: formData
    })
        .then((res) => {
            if (!res.ok) {
                toast.error('Falha ao enviar', {
                    description: 'Desculpe, não foi possível enviar seu arquivo no momento'
                })
            }

            return res.json()
        })
        .then((data) => {
            return data
        })
    if (!signedUrl) return

    fetch(signedUrl, {
        method: 'PUT',
        body: file
    })
        .then((res) => {
            if (res.ok) return res

            throw new Error('Failed to upload file')
        })
        .then((data) => {
            currentEditor.chain().focus().setImage({ src: filePath, alt }).run()
        })
        .catch((err) => {
            toast.error('Falha ao enviar arquivo', {
                description: 'Tente novamente mais tarde'
            })
        })
}

export function Editor({
    className,
    content = '',
    editable = false,
    outputRef,
    setOutput
}: EditorProps) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [altText, setAltText] = useState('')

    // Editor instance
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'min-h-[60svh] px-1 pb-5 outline-none [&_.ProseMirror-gapcursor]:after:border-foreground [&_table]:table-fixed'
            }
        },
        extensions: [
            StarterKit,
            CharacterCount.configure({
                limit: 16384
            }),
            FileHandler.configure({
                allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
                onDrop: (currentEditor, files, pos) => {
                    files.forEach((file) => {
                        uploadFile(file, currentEditor as EditorType)
                    })
                },
                onPaste: (currentEditor, files, htmlContent) => {
                    files.forEach((file) => {
                        if (htmlContent) return

                        uploadFile(file, currentEditor as EditorType)
                    })
                }
            }),
            Heading.configure({
                levels: [2, 3]
            }).extend({
                marks: 'italic'
            }),
            Image,
            Link.configure({
                protocols: ['https']
            }),
            Markdown.configure({
                transformPastedText: true
            }),
            Mathematics.configure({
                regex: /\$([^\$\s]*)\$/gi
            }),
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
                lastColumnResizable: false,
                resizable: true
            }),
            TableCell.extend({
                content: 'paragraph'
            }),
            TableHeader.extend({
                content: 'paragraph'
            }),
            TableRow
        ],
        content: content || window.sessionStorage.getItem('editorContent'),
        editable: editable,
        onUpdate({ editor }) {
            window.sessionStorage.setItem('editorContent', editor.getHTML())

            const markdownOutput = editor.storage.markdown.getMarkdown()
            if (outputRef) outputRef.current = markdownOutput
            if (setOutput) setOutput(markdownOutput)
        }
    })

    return (
        <Body className={className}>
            {editor && (
                <>
                    <BubbleMenu editor={editor} />
                    <EditorContent editor={editor} />
                    <CommandBar editor={editor} />
                </>
            )}
        </Body>
    )
}
