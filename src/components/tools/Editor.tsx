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
import { Body } from '@/layouts/Content'
import {
    BetweenHorizontalStart,
    BetweenHorizontalEnd,
    BetweenVerticalStart,
    BetweenVerticalEnd,
    Bold,
    Flower2,
    ImagePlus,
    Italic,
    Link as LinkIcon,
    MoreHorizontal,
    Sigma,
    Table as TableIcon
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import 'katex/dist/katex.min.css'
import { tv } from 'tailwind-variants'
import useKeyboardFocus from '@/hooks/useKeyboardFocus'

interface EditorProps {
    className?: string
    content?: string
    editable?: boolean
    outputRef?: React.MutableRefObject<string>
    setOutput?: React.Dispatch<React.SetStateAction<string>>
}
interface SearchResult {
    id: string
    subject: string
    subjectTitle: string
    name: string
    title: string
}

function EditorBubbleMenu({ editor }: { editor: EditorType }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if (query.length < 2) return
        if (query.length === 0) return setResults([]) // Remove the list when the search is empty

        // Delay the request to avoid too many requests
        const delay = setTimeout(() => {
            fetch(`/api/contents?multiple&q=${query}`, {
                next: { revalidate: 600 }
            })
                .then((res) => {
                    if (res.ok) return res.json()
                })
                .then((data) => {
                    setResults(data.contents)
                })
        }, 200)

        return () => clearTimeout(delay)
    }, [query])

    return (
        <BubbleMenu
            className="flex items-center gap-1 rounded-lg border bg-background p-1"
            editor={editor}
        >
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
                {editor.isActive('table') ? (
                    <></>
                ) : (
                    <>
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
                    </>
                )}
                {editor.isActive('link') ? (
                    <button
                        className="px-3"
                        onClick={() => {
                            editor.chain().focus().unsetLink().run()
                        }}
                    >
                        <LinkIcon size="20" />
                    </button>
                ) : (
                    <Popover>
                        <PopoverTrigger
                            className="px-3"
                            onClick={() =>
                                setQuery(window.getSelection()?.toString().slice(0, 32) || '')
                            }
                        >
                            <LinkIcon size="20" />
                        </PopoverTrigger>
                        <PopoverContent className="min-w-0">
                            <Label>Vincular conteúdo</Label>
                            <p className="my-2 block text-sm">
                                Digite um conteúdo ou termo para pesquisar
                            </p>
                            <Input
                                minLength={2}
                                maxLength={48}
                                placeholder="Pesquisar conteúdos..."
                                defaultValue={window.getSelection()?.toString().slice(0, 32)}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {results.length > 0 && (
                                <ul>
                                    {results.map(
                                        ({
                                            id,
                                            subject,
                                            subjectTitle,
                                            name,
                                            title
                                        }: SearchResult) => {
                                            return (
                                                <li
                                                    key={id}
                                                    onClick={() => {
                                                        editor
                                                            .chain()
                                                            .focus()
                                                            .setLink({
                                                                href: `/${subject}/${name}`
                                                            })
                                                            .run()
                                                    }}
                                                >{`${title} - ${subjectTitle}`}</li>
                                            )
                                        }
                                    )}
                                </ul>
                            )}
                        </PopoverContent>
                    </Popover>
                )}
            </ToggleGroup>
        </BubbleMenu>
    )
}

const editorCommandBarClass = tv({
    base: 'sticky bottom-4 mx-auto w-max rounded-lg border bg-background transition-transform',
    variants: {
        focused: {
            true: '-translate-y-48 md:translate-y-0'
        }
    }
})
function EditorCommandBar({ editor }: { editor: EditorType }) {
    return (
        <ToggleGroup
            className={editorCommandBarClass({ focused: useKeyboardFocus() })}
            type="multiple"
        >
            <ToggleGroupItem
                data-state={editor.isActive('bold') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                value="bold"
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Bold size="20" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Negrito</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ToggleGroupItem>
            <ToggleGroupItem
                data-state={editor.isActive('italic') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                value="italic"
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Italic size="20" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Itálico</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ToggleGroupItem>
            {editor.isActive('table') ? (
                <>
                    <ToggleGroupItem
                        data-state="off"
                        onClick={() => editor.chain().focus().addRowAfter().run()}
                        value="new-row"
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BetweenHorizontalStart size="20" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Adicionar linha</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        data-state="off"
                        disabled={editor.isActive('tableHeader') ? true : false}
                        onClick={() => editor.chain().focus().deleteRow().run()}
                        value="delete-row"
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BetweenHorizontalEnd size="20" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Excluir linha</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        data-state="off"
                        onClick={() => editor.chain().focus().addColumnAfter().run()}
                        value="new-column"
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BetweenVerticalStart size="20" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Adicionar coluna</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        data-state="off"
                        onClick={() => editor.chain().focus().deleteColumn().run()}
                        value="delete-column"
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BetweenVerticalEnd size="20" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Excluir coluna</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </ToggleGroupItem>
                </>
            ) : (
                <>
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
                    <ToggleGroupItem data-state="off" value="upload">
                        <label htmlFor="image">
                            <ImagePlus size="20" />
                        </label>
                        <input
                            accept="image/jpeg,image/png,image/gif"
                            className="hidden"
                            type="file"
                            name="image"
                            id="image"
                            onChange={(e) => {
                                if (!e.target.files) return
                                uploadFile(e.target.files[0], editor)
                            }}
                        />
                    </ToggleGroupItem>
                </>
            )}
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
                        disabled={editor.isActive('table')}
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
                        disabled={editor.isActive('table')}
                        className="flex w-full flex-1 justify-normal gap-2"
                        size="sm"
                        value="poem"
                    >
                        <Flower2 /> Poema
                    </ToggleGroupItem>
                    {editor.isActive('table') ? (
                        <ToggleGroupItem
                            data-state="off"
                            onClick={() => editor.chain().focus().deleteTable().run()}
                            className="flex w-full flex-1 justify-normal gap-2"
                            size="sm"
                            value="table"
                        >
                            <TableIcon /> Excluir tabela
                        </ToggleGroupItem>
                    ) : (
                        <ToggleGroupItem
                            data-state="off"
                            disabled={editor.isActive('table') ? true : false}
                            onClick={() => editor.chain().focus().insertTable().run()}
                            className="flex w-full flex-1 justify-normal gap-2"
                            size="sm"
                            value="table"
                        >
                            <TableIcon /> Nova tabela
                        </ToggleGroupItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </ToggleGroup>
    )
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
                        if (htmlContent) return

                        uploadFile(file, currentEditor as EditorType)
                    })
                }
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
