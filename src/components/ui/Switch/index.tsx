import { tv } from 'tailwind-variants'

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const input = tv({
    base: ''
})

export default function Switch({ className, ...rest }: SwitchProps) {
    return <input className={input({ className })} type="checkbox" />
}
