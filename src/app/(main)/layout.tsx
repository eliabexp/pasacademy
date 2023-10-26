import Nav from '@/components/main/Nav'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        {children}
        <Nav/>
        </>
    )
}
