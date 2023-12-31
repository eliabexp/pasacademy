import { Body, Title } from '@/layouts/Content'
import { notFound } from 'next/navigation'

interface Content {
    params: { [key: string]: string }
}

export default async function Conteudo({ params }: Content) {
    const { materia, conteudo } = params

    const content = await fetch(
        process.env.API_URL + `/api/contents?subject=${materia}&name=${conteudo}`
    ).then(async (res) => {
        if (!res.ok) notFound()

        return await res.json()
    })

    return (
        <main className="flex-1 p-4">
            <Title
                title={content.title}
                subtitle={`${content.subjectTitle} - ${content.level}º ano`}
            />
            <Body>
                <p></p>
            </Body>
        </main>
    )
}
