import { tv } from 'tailwind-variants'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styleType?: 'solid' | 'soft' | 'success' | 'danger'
}

const button = tv({
    base: 'flex flex-row items-center gap-3 rounded-md px-4 py-2 font-bold text-white disabled:bg-white/60',
    variants: {
        styleType: {
            solid: '',
            soft: '',
            success: '',
            danger: ''
        }
    }
})

export default function Button({ styleType = 'solid', className, ...rest }: ButtonProps) {
    return <button className={button({ styleType, className })} {...rest} />
}
