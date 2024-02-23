import Link from 'next/link'
import { LibraryBig } from 'lucide-react'
import { tv } from 'tailwind-variants'

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
    color?: 'white' | 'black'
}

const link = tv({
    base: 'flex items-center gap-2',
    variants: {
        color: {
            white: '[&>*]:text-white',
            black: '[&>*]:text-black'
        }
    }
})

export default function Logo({ color, className }: LogoProps) {
    return (
        <Link className={link({ color, className })} href="/">
            <LibraryBig size="32" />
            <span className="text-nowrap text-xl font-bold">PAS Academy</span>
        </Link>
    )
}
