import Slide from '@/components/ui/Slide'

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
        <section className="w-full overflow-hidden">
            <ul className="w-full">
                {slider.map((slide) => (
                    <li key={slide.name}>
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
