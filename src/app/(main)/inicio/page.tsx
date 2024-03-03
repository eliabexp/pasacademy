import { ContentRow, Slider } from '@/layouts/Inicio'
import { type Topic } from '@/models/topic'

export default async function Inicio() {
    const topics = await fetch(process.env.API_URL + '/topics', { cache: 'no-cache' }).then((res) =>
        res.json()
    )

    return (
        <main className="pt-3">
            <Slider slider={topics.slider} />
            {topics.rows.map((row: Topic) => {
                switch (row.type) {
                    case 'contentRow':
                        return <ContentRow key={row.name} row={row} />
                    default:
                        return <></>
                }
            })}
        </main>
    )
}
