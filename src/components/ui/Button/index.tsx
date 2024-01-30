import { tv } from 'tailwind-variants'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'ghost'
}

const button = tv({
    base: 'flex items-center gap-3 rounded-lg px-4 py-2 text-white transition-colors duration-200',
    variants: {
        variant: {
            solid: 'bg-black font-bold text-white hover:bg-black/80 disabled:bg-black/60 dark:bg-white dark:text-black dark:hover:bg-white/80 dark:disabled:bg-white/60',
            ghost: 'bg-transparent',
        }
    },
    defaultVariants: {
        variant: 'solid'
    }
})

export default function Button({ variant, className, ...rest }: ButtonProps) {
    return <button className={button({ variant, className })} {...rest} />
}
