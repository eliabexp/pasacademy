'use client'

import NavButton from '@/components/ui/nav-button'

interface MenuProps {
    links: LinksList[]
    page: string
}

interface LinksList {
    name: string
    url: string
    icon: React.ReactNode
    iconActive: React.ReactNode
    hide?: boolean
}

export default function Menu({ links, page }: MenuProps) {
    return (
        <ul className="flex h-14 w-full items-center md:size-full md:shrink-0 md:flex-col md:gap-1">
            {links.map((link) => {
                const { name, url, icon, iconActive } = link
                const isActive = page === url

                if (link.hide) return null
                return (
                    <li
                        className="w-full [&:nth-child(n+6)]:hidden md:[&:nth-child(n+6)]:flex"
                        key={name}
                    >
                        <NavButton
                            url={'/' + url}
                            icon={isActive ? iconActive : icon}
                            name={name}
                            active={isActive}
                        />
                    </li>
                )
            })}
        </ul>
    )
}
