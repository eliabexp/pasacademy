import Image from 'next/image'
import Link from 'next/link'

interface ContentCardProps {
    title: string
    thumb: string
    subject: string
    name: string
}

export default function ContentCard({ title, thumb, subject, name }: ContentCardProps) {
    return (
        <Link
            className="block w-[248px] p-1 text-center transition-transform duration-200 ease-in hover:scale-105"
            href={`/${subject}/${name}`}
        >
            <Image
                className="mb-1 rounded-2xl"
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
