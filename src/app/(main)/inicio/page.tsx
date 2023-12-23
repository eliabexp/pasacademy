import ContentRow from '@/components/main/ContentRow'
import Button from '@/components/ui/Button'
import Search from '@/components/main/Search'

export default async function Inicio() {
    const topics = await fetch(process.env.API_URL + '/api/topics', { cache: 'no-cache' }).then((res) => res.json())

    return (
        <>
            <header>
                <Search />
            </header>
            <main>
                
            </main>
        </>
    )
}