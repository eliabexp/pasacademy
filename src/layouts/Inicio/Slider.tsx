'use client'

import { Slide } from '@/components/ui/slide'
import { useState } from 'react'

interface SliderProps {
    slider: {
        name: string
        description: string
        url: string
        image: string
    }[]
}

export default function Slider({ slider }: SliderProps) {
    const [list, setList] = useState(slider)

    return (
        <section className="md:h-80">
            <ul className="relative size-full overflow-x-hidden">
                {list.map((slide, index) => (
                    <li
                        className="relative hidden first:mx-auto first:block first:aspect-video first:h-full first:w-11/12 last:absolute last:right-1/2 last:top-1/2 last:-z-10 last:block last:-translate-x-1/2 last:-translate-y-1/2 last:scale-75 last:opacity-50 md:first:w-auto [&:nth-child(2)]:absolute [&:nth-child(2)]:left-1/2 [&:nth-child(2)]:top-1/2 [&:nth-child(2)]:-z-10 [&:nth-child(2)]:block [&:nth-child(2)]:-translate-y-1/2 [&:nth-child(2)]:translate-x-1/2 [&:nth-child(2)]:scale-75 [&:nth-child(2)]:opacity-50"
                        key={slide.name}
                    >
                        <Slide
                            name={slide.name}
                            description={slide.description}
                            url={slide.url}
                            image={slide.image}
                            priority={index === 0}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
