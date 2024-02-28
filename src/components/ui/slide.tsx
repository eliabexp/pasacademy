import Image from 'next/image'
import Link from 'next/link'

interface SlideProps {
    name: string
    description: string
    url?: string
    image: string
    priority: boolean
}

const Slide = ({ name, description, url, image, priority }: SlideProps) => {
    return (
        <Link className="relative block overflow-hidden rounded-2xl" href={url || ''}>
            <Image
                className="block size-full transition-transform duration-500 ease-in-out hover:scale-105"
                src={image}
                alt={name}
                width="768"
                height="432"
                draggable="false"
                priority={priority}
            />
            <div className="absolute bottom-4 px-3 text-white drop-shadow-[0px_6px_12px_black]">
                <h2 className="text-lg font-bold md:text-xl">{name}</h2>
                <p className="text-sm">{description}</p>
            </div>
        </Link>
    )
}

export { Slide }
