import Image from 'next/image'
import Link from 'next/link'

interface SlideProps {
    name: string
    description: string
    url?: string
    image: string
    priority: boolean
}

const SliderItem = ({ name, description, url, image, priority }: SlideProps) => {
    return (
        <li className="relative hidden first:mx-auto first:block first:aspect-video first:h-full first:w-11/12 last:absolute last:right-1/2 last:top-1/2 last:-z-10 last:block last:-translate-x-1/2 last:-translate-y-1/2 last:scale-75 md:first:w-auto [&:nth-child(2)]:absolute [&:nth-child(2)]:left-1/2 [&:nth-child(2)]:top-1/2 [&:nth-child(2)]:-z-10 [&:nth-child(2)]:block [&:nth-child(2)]:-translate-y-1/2 [&:nth-child(2)]:translate-x-1/2 [&:nth-child(2)]:scale-75">
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
        </li>
    )
}

const Slider = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="bg-gradient-to-r from-background/75 via-transparent to-background/75 md:h-80">
            <ul className="relative size-full overflow-x-hidden">{children}</ul>
        </section>
    )
}

export { SliderItem, Slider }
