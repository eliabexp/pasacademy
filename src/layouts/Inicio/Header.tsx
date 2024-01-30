import DarkModeSwitcher from '@/components/tools/DarkModeSwitcher'
import Search from './Search'

export default function Header() {
    return (
        <div className="flex w-full items-center gap-3 px-4 md:justify-between">
            <Search placeholder="O que você quer aprender hoje?" />
            <DarkModeSwitcher />
        </div>
    )
}
