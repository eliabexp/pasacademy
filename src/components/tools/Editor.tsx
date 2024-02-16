'use client'

import CharacterCount from '@tiptap/extension-character-count'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { BubbleMenu, EditorContent, type Editor as EditorType, useEditor } from '@tiptap/react'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import { Markdown } from 'tiptap-markdown'
import { Body } from '@/components/ui/content'
import {
    Bold,
    Flower2,
    Italic,
    Link as LinkIcon,
    MoreHorizontal,
    Paperclip,
    Sigma
} from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useState } from 'react'
import 'katex/dist/katex.min.css'

interface EditorProps {
    className?: string
    content?: string
    editable?: boolean
    outputRef?: React.MutableRefObject<string>
    setOutput?: React.Dispatch<React.SetStateAction<string>>
}

function EditorBubbleMenu({ editor }: { editor: EditorType }) {
    return (
        <BubbleMenu className="flex items-center gap-1 rounded-lg border p-1" editor={editor}>
            <ToggleGroup type="multiple">
                <ToggleGroupItem
                    data-state={editor.isActive('bold') ? 'on' : 'off'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    value="bold"
                >
                    <Bold size="20" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    data-state={editor.isActive('italic') ? 'on' : 'off'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    value="italic"
                >
                    <Italic size="20" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    value="title"
                >
                    Título
                </ToggleGroupItem>
                <ToggleGroupItem
                    data-state={editor.isActive('heading', { level: 3 }) ? 'on' : 'off'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    value="subtitle"
                >
                    Subtítulo
                </ToggleGroupItem>
            </ToggleGroup>
        </BubbleMenu>
    )
}

function EditorCommandBar({ editor }: { editor: EditorType }) {
    return (
        <ToggleGroup
            className="sticky bottom-4 mx-auto w-max rounded-lg border bg-background"
            type="multiple"
        >
            <ToggleGroupItem
                data-state={editor.isActive('bold') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                value="bold"
            >
                <Bold size="20" />
            </ToggleGroupItem>
            <ToggleGroupItem
                data-state={editor.isActive('italic') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                value="italic"
            >
                <Italic size="20" />
            </ToggleGroupItem>
            <ToggleGroupItem
                data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                value="title"
            >
                Título
            </ToggleGroupItem>
            <ToggleGroupItem
                data-state={editor.isActive('heading', { level: 3 }) ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                value="subtitle"
            >
                Subtítulo
            </ToggleGroupItem>
            <ToggleGroupItem
                data-state="off"
                onClick={() => editor.chain().focus().run()}
                value="upload"
            >
                <Paperclip size="20" />
            </ToggleGroupItem>
            <DropdownMenu>
                <DropdownMenuTrigger className="px-3">
                    <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-0">
                    <ToggleGroupItem
                        data-state={
                            editor.isActive('codeBlock', { language: 'formula' }) ? 'on' : 'off'
                        }
                        onClick={() =>
                            editor.chain().focus().toggleCodeBlock({ language: 'formula' }).run()
                        }
                        className="flex w-full flex-1 justify-normal gap-2"
                        size="sm"
                        value="formula"
                    >
                        <Sigma /> Fórmula
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        data-state={
                            editor.isActive('codeBlock', { language: 'poem' }) ? 'on' : 'off'
                        }
                        onClick={() =>
                            editor.chain().focus().toggleCodeBlock({ language: 'poem' }).run()
                        }
                        className="flex w-full flex-1 justify-normal gap-2"
                        size="sm"
                        value="poem"
                    >
                        <Flower2 /> Poema
                    </ToggleGroupItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </ToggleGroup>
    )
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

    const uploadFile = async (file: File, currentEditor: EditorType) => {
        const alt = prompt('Digite uma legenda que descreva a imagem')
        if (!alt) return

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

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'min-h-[60svh] outline-none px-1 pb-5'
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
            FileHandler.configure({
                allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
                onDrop: (currentEditor, files, pos) => {
                    files.forEach((file) => {
                        uploadFile(file, currentEditor as EditorType)
                    })
                },
                onPaste: (currentEditor, files, htmlContent) => {
                    files.forEach((file) => {
                        console.log(htmlContent, file)
                        if (htmlContent) return

                        uploadFile(file, currentEditor as EditorType)
                    })
                }
            }),
            Image,
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
            Table,
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
            if (setOutput) setOutput(markdownOutput)
        }
    })

    return (
        <Body className={className}>
            {editor && (
                <>
                    <EditorBubbleMenu editor={editor} />
                    <EditorContent editor={editor} />
                    <EditorCommandBar editor={editor} />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Legenda da imagem</DialogTitle>
                                <DialogDescription>
                                    Insira uma legenda para descrever o conteúdo da imagem
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <Input
                                    onChange={(e) => setAltText(e.target.value)}
                                    minLength={4}
                                    maxLength={128}
                                    name="altText"
                                    placeholder=""
                                />
                            </div>
                            <DialogFooter>
                                <Button disabled={altText.length < 4}>Enviar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </Body>
    )
}
