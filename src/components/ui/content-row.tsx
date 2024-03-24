import Image from 'next/image'
import Link from 'next/link'

const ContentRowTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="mx-4 text-2xl font-bold">{children}</h2>
}

const ContentRowList = ({ children }: { children?: React.ReactNode }) => {
    return <ul className="scrollbar-hidden my-2 flex w-full overflow-y-hidden">{children}</ul>
}

const ContentRowCard = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
        <li className="shrink-0 first:ml-4">
            <Link
                className="block h-40 w-60 p-1 text-center transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                href={href}
            >
                {children}
            </Link>
        </li>
    )
}

const ContentRowCardImage = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <Image
            className="mb-1 block h-32 rounded-2xl"
            src={src}
            alt={alt}
            width={240}
            height={135}
        />
    )
}

const ContentRowCardTitle = ({ children }: { children: React.ReactNode }) => {
    return <span className="block truncate">{children}</span>
}

const ContentRow = ({ children }: { children: React.ReactNode }) => {
    return <section className="my-5 w-full">{children}</section>
}

export {
    ContentRowTitle,
    ContentRowList,
    ContentRowCard,
    ContentRowCardImage,
    ContentRowCardTitle,
    ContentRow
}
