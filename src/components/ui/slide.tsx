import Image from 'next/image'
import Link from 'next/link'

interface SlideProps {
    name: string
    description: string
    url?: string
    image: string
}

const Slide = ({ name, description, url, image }: SlideProps) => {
    return (
        <Link
            className="relative mx-4 block overflow-hidden rounded-2xl md:h-full"
            href={url || ''}
        >
            <Image
                className="block w-full transition-transform duration-500 ease-in-out hover:scale-105 md:h-full"
                src={image}
                alt={name}
                width="1280"
                height="720"
                draggable="false"
            />
            <div className="absolute bottom-6 left-3 text-white drop-shadow-[0px_6px_12px_black]">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-sm">{description}</p>
            </div>
        </Link>
    )
}

export {
    Slide
}
