'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Bookmark, Heart, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Interactions({ id, title }: { id: string; title: string }) {
    const likeContent = () => {
        fetch(`/api/contents/${id}/interactions`, {
            method: 'POST',
            body: JSON.stringify({ type: 'like' })
        })
    }
    
    const shareContent = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href
            })
        }
    }

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button onClick={shareContent}>
                            <Heart size="20" />
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
                        <button onClick={shareContent}>
                            <Share2 size="20" />
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
                        <button onClick={shareContent}>
                            <Bookmark size="20" />
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
