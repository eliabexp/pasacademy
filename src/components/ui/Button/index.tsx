'use client'

import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styleType?: 'solid' | 'soft' | 'success' | 'danger'
}

export default function Button({ styleType = 'solid', ...rest }: ButtonProps) {
    return <button className={styles[styleType]} {...rest} />
}
