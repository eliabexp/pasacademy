import Nav from '@/components/main/Nav'

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        {children}
        <Nav/>
        </>
    )
}
