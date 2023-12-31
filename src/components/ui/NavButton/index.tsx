import Link from 'next/link'
import { tv } from 'tailwind-variants'

interface NavButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
    name: string
    url: string
    icon: React.ReactNode
    active?: boolean
}

const link = tv({
    base: 'flex flex-1 flex-col items-center gap-1 text-xs md:w-full md:flex-row md:gap-3 md:rounded-xl md:px-6 md:py-2.5 md:text-base md:hover:bg-hover dark:md:hover:bg-hover-dark [&:nth-child(n+6)]:hidden md:[&:nth-child(n+6)]:flex',
    variants: {
        active: {
            true: 'font-bold md:bg-hover dark:md:bg-hover-dark'
        }
    }
})

export default function NavButton({ name, url, icon, active, className }: NavButtonProps) {
    return (
        <Link className={link({ active, className })} href={url}>
            {icon} {name}
        </Link>
    )
}
