import { type Editor } from '@tiptap/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
    BetweenHorizontalStart,
    BetweenHorizontalEnd,
    BetweenVerticalStart,
    BetweenVerticalEnd,
    Bold,
    Flower2,
    ImagePlus,
    Italic,
    MoreHorizontal,
    Sigma,
    Table
} from 'lucide-react'
import { tv } from 'tailwind-variants'
import { useKeyboardFocus } from '@/hooks/useKeyboardFocus'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'


const editorCommandBarClass = tv({
    base: 'sticky bottom-4 mx-auto w-max rounded-lg border bg-background transition-transform',
    variants: {
        focused: {
            true: '-translate-y-40 md:translate-y-0'
        }
    }
})

export default function EditorCommandBar({ editor }: { editor: Editor }) {
    return (
        <ToggleGroup
            className={editorCommandBarClass({ focused: useKeyboardFocus() })}
            type="multiple"
        >
            <ToggleGroupItem
                data-state={editor.isActive('bold') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleMark('bold').run()}
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
                onClick={() => editor.chain().focus().toggleMark('italic').run()}
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
                            editor.chain().focus().toggleWrap('codeBlock', { language: 'formula' }).run()
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
                            editor.chain().focus().toggleWrap('codeBlock', { language: 'poem' }).run()
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
                            <Table /> Excluir tabela
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
                            <Table /> Nova tabela
                        </ToggleGroupItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </ToggleGroup>
    )
}