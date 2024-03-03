'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Bookmark, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

interface InteractionsProps {
    id: string
    title: string
    likeCount: number
    liked: boolean
    saved: boolean
}

const heartVariants = tv({
    base: '',
    variants: {
        isLiked: {
            true: 'animate-pulse'
        }
    }
})

export default function Interactions({ id, title, likeCount, liked, saved }: InteractionsProps) {
    const [isLiked, setIsLiked] = useState(liked)
    const [isSaved, setIsSaved] = useState(false)

    const likeContent = () => {
        fetch(`/api/contents/${id}/interactions`, {
            method: 'POST',
            body: JSON.stringify({ type: 'like' })
        })

        setIsLiked(!isLiked)
    }
    const shareContent = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href
            })
        }
    }
    const saveContent = () => {
        fetch(`/api/contents/${id}/interactions`, {
            method: 'POST',
            body: JSON.stringify({ type: 'save' })
        })

        setIsSaved(!isSaved)
    }

    return (
        <div className="flex justify-between rounded-md border p-4">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="flex items-center gap-3" onClick={likeContent}>
                            <Heart
                                className={heartVariants({ isLiked })}
                                color={isLiked ? 'red' : 'currentColor'}
                                fill={isLiked ? 'red' : 'transparent'}
                                size="20"
                            />
                            <span className="text-sm">
                                {likeCount > 0 ? `${likeCount} curtidas` : 'Curtir'}
                            </span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Curtir</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="flex items-center gap-3" onClick={shareContent}>
                            <Share2 size="20" />
                            <span className="text-sm">Compartilhar</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Compartilhar</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="flex items-center gap-3" onClick={saveContent}>
                            <Bookmark
                                color={isSaved ? 'yellow' : 'currentColor'}
                                fill={isSaved ? 'yellow' : 'transparent'}
                                size="20"
                            />
                            <span className="text-sm">Salvar</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Salvar</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
