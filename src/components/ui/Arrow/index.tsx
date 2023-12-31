'use client'

import { ChevronLeft, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { tv } from 'tailwind-variants'

interface ArrowProps extends React.HTMLAttributes<HTMLButtonElement> {
    direction: 'left' | 'right' | 'up' | 'down'
    action: 'back' | 'forward'
}

const button = tv({
    base: '',
    variants: {
        direction: {
            left: 'rotate-180 transform',
            right: 'rotate-0 transform',
            up: 'rotate-90 transform',
            down: '-rotate-90 transform'
        }
    }
})

export default function BackArrow({ action, direction, className }: ArrowProps) {
    let onClick
    switch (action) {
        case 'back':
            onClick = () => window.history.back()
            break
        case 'forward':
            onClick = () => window.history.forward()
            break
    }

    return (
        <button className={button({ direction, className })} onClick={onClick}>
            <ChevronRight />
        </button>
    )
}
