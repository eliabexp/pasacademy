import Image from 'next/image'
import Link from 'next/link'

interface ContentCardProps {
    title: string
    thumb: string
    subject: string
    name: string
}

const ContentCard = ({ title, thumb, subject, name }: ContentCardProps) => {
    return (
        <Link
            className="block w-60 p-1 text-center transition-transform duration-300 ease-in-out hover:scale-105"
            href={`/${subject}/${name}`}
        >
            <Image
                className="mb-1 block rounded-2xl"
                src={thumb}
                alt={title}
                width={240}
                height={135}
                draggable="false"
            />
            {title}
        </Link>
    )
}

export { ContentCard }
