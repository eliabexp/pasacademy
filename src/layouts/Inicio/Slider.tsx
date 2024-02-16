import { Slide } from '@/components/ui/slide'

interface SliderProps {
    slider: {
        name: string
        description: string
        url: string
        image: string
    }[]
}

export default function Slider({ slider }: SliderProps) {
    return (
        <section className="w-full md:h-80">
            <ul className="flex w-full overflow-x-hidden md:h-full">
                {slider.map((slide) => (
                    <li className="md:shrink-0" key={slide.name}>
                        <Slide
                            name={slide.name}
                            description={slide.description}
                            url={slide.url}
                            image={slide.image}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
