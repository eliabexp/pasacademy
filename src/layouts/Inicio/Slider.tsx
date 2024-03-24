import { Slider, SliderItem } from '@/components/ui/slider'

interface MainSliderProps {
    slider: {
        name: string
        description: string
        url: string
        image: string
    }[]
}

export default function MainSlider({ slider }: MainSliderProps) {
    return (
        <Slider>
            {slider.map((slide, index) => (
                <SliderItem
                    name={slide.name}
                    description={slide.description}
                    url={slide.url}
                    image={slide.image}
                    key={slide.name}
                    priority={index === 0}
                />
            ))}
        </Slider>
    )
}
