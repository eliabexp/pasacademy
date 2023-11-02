import '@/styles/main.scss'
import Logo from '@/components/main/Logo'
import Nav from '@/components/main/Nav'

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        {children}
        <Nav/>
        </>
    )
}
