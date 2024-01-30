import { tv } from 'tailwind-variants'
import { Search } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const input = tv({
    base: 'w-full text-ellipsis rounded-lg border bg-bg px-3 py-2 shadow-shadow4 focus:shadow-[0_0_2px] dark:bg-bg-dark dark:shadow-shadow4-dark',
    variants: {
        search: {
            true: 'pl-10'
        }
    }
})

export default function Input({ type, className, children, ...rest }: InputProps) {
    const search = type === 'search'

    return (
        <div className="relative">
            <input className={input({ search, className })} {...rest} />
            {type === 'search' && <Search className="absolute left-2 top-1/2 -translate-y-1/2" />}
            {children && (
                <menu className="absolute top-full mt-2 w-full overflow-hidden rounded-lg border bg-black">
                    {children}
                </menu>
            )}
        </div>
    )
}
