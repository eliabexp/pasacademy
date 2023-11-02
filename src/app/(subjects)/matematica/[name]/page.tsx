import ContentBody from '@/components/content/Content'
import { notFound, redirect } from 'next/navigation'
import type { Content } from '@/models/content'

async function getContent(name: string) {
    return await fetch(process.env.API_URL + `/api/contents?subject=matematica&name=${name}`)
    .then(res => {
        switch(res.status) {
            case 404: notFound()
            case 401: redirect('/login')
            default: return res.json() as Promise<Content>
        }
    })
}

export async function generateMetadata({ params }: { params: { name: string } }) {
    const data = await getContent(params.name)

    return {
        title: data.title
    }
}

export default async function Content({ params }: { params: { name: string } }) {
    const data = await getContent(params.name)

    return (
        <main>
            <ContentBody data={data}/>
        </main>
    )
}
