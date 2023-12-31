import DarkModeSwitcher from '@/components/tools/DarkModeSwitcher'
import Search from './Search'

export default function Header() {
    return (
        <div className="flex w-full flex-row items-center gap-2 md:w-[calc(100%-(240px-1rem))] md:px-4">
            <Search placeholder="O que você quer aprender hoje?" />
            <DarkModeSwitcher />
        </div>
    )
}
