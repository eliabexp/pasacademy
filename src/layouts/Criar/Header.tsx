import { LayoutContext } from '@/app/(main)/layout'
import { useContext } from 'react'

export default function Header() {
    const { layout } = useContext(LayoutContext)

    const createHeader = layout.createHeader

    return (
        <div className="block w-full">
            <h2 className="text-center text-lg font-bold">
                {createHeader || 'Criar conteúdo'}
            </h2>
        </div>
    )
}
