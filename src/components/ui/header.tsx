import Logo from '@/components/ui/logo'

const header = ({ children }: { children: React.ReactNode }) => {
    return (
        <header className="sticky top-0 z-20 mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-0">
            <Logo className="hidden justify-center md:flex md:shrink-0 md:basis-60" />
            {children}
        </header>
    )
}

export { header }