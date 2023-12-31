import { ContentRow, Slider } from '@/layouts/Inicio'

export default async function Inicio() {
    const topics = await fetch(process.env.API_URL + '/api/topics', { cache: 'no-cache' }).then(
        (res) => res.json()
    )

    return (
        <main className="flex-1 pt-3">
            <Slider slider={topics.slider} />
            <ContentRow row={topics.contentRows[0]} />
        </main>
    )
}
