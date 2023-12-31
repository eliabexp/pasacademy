import { tv } from 'tailwind-variants'
import { Search } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const input = tv({
    base: 'w-full text-ellipsis rounded-xl border p-2 text-lg shadow-shadow4 focus:shadow-[0_0_8px] dark:shadow-shadow4-dark',
    variants: {
        search: {
            true: 'pl-10'
        }
    }
})

export default function Input({ type, className, ...rest }: InputProps) {
    const search = type === 'search'

    return (
        <div className="relative">
            <input className={input({ search, className })} {...rest} />
            {type === 'search' && <Search className="absolute left-2 top-1/2 -translate-y-1/2" />}
        </div>
    )
}
