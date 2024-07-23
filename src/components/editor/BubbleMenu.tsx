import { BubbleMenu, type Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bold, Italic, Link, SearchIcon, Unlink } from 'lucide-react'

interface SearchResult {
    id: string
    subject: string
    subjectName: string
    name: string
    title: string
}

export default function EditorBubbleMenu({ editor }: { editor: Editor }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if (query.length < 2) return
        if (query.length === 0) return setResults([]) // Remove the list when the search is empty

        // Delay the request to avoid too many requests
        const delay = setTimeout(() => {
            fetch(`/api/contents?multiple&q=${query}&limit=5`, {
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
            tippyOptions={{ duration: 150 }}
            shouldShow={({ editor, view, state, from, to }) => {
                const { doc } = state
                return doc.textBetween(from, to).length > 0 && !editor.isActive('image')
            }}
        >
            <ToggleGroup type="multiple">
                <ToggleGroupItem
                    data-state={editor.isActive('bold') ? 'on' : 'off'}
                    onClick={() => editor.chain().focus().toggleMark('bold').run()}
                    value="bold"
                >
                    <Bold size="20" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    data-state={editor.isActive('italic') ? 'on' : 'off'}
                    onClick={() => editor.chain().focus().toggleMark('italic').run()}
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
                        <Unlink size="20" />
                    </button>
                ) : (
                    <Popover>
                        <PopoverTrigger
                            className="px-3"
                            onClick={() =>
                                setQuery(window.getSelection()?.toString().slice(0, 32) || '')
                            }
                        >
                            <Link size="20" />
                        </PopoverTrigger>
                        <PopoverContent className="min-w-0">
                            <Label htmlFor="searchContent">Criar link</Label>
                            <p className="my-2 block text-sm">
                                Digite um conteúdo ou termo para vincular
                            </p>
                            <div className="relative size-full">
                                <SearchIcon
                                    className="absolute left-2 top-1/2 -translate-y-1/2"
                                    size="16"
                                />
                                <Input
                                    className="mb-3 pl-8"
                                    id="searchContent"
                                    minLength={2}
                                    maxLength={48}
                                    placeholder="Pesquisar conteúdos..."
                                    defaultValue={window.getSelection()?.toString().slice(0, 32)}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            {results.length > 0 && (
                                <ul>
                                    {results.map(
                                        ({
                                            id,
                                            subject,
                                            subjectName,
                                            name,
                                            title
                                        }: SearchResult) => {
                                            return (
                                                <li className="my-2 w-full text-sm" key={id}>
                                                    <button
                                                        className="block w-full rounded-md p-2 text-left hover:bg-hover"
                                                        onClick={() => {
                                                            editor
                                                                .chain()
                                                                .focus()
                                                                .setLink({
                                                                    href: `/${subject}/${name}`
                                                                })
                                                                .run()
                                                        }}
                                                    >
                                                        {title}
                                                    </button>
                                                </li>
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
