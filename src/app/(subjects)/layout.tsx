import '@/styles/main.scss'
import Nav from '@/layouts/Nav'

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Nav />
        </>
    )
}
