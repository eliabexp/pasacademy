import { tv } from 'tailwind-variants'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const input = tv({
    base: ''
})

export default function Switch({ className, ...rest }: CheckboxProps) {
    return <input className={input({ className })} type="checkbox" />
}
