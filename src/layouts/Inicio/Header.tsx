import { DarkModeSwitcher } from '@/components/tools/DarkModeSwitcher'
import Search from './Search'

export default function Header() {
    return (
        <>
            <Search placeholder="O que você quer aprender hoje?" />
            <DarkModeSwitcher />
        </>
    )
}
