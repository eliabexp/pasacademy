import { Atom, BookOpenText, Brain, Brush, CaseSensitive, Fish, FlaskConical, LibraryBig, Map, ScrollText, Sigma, Speech } from 'lucide-react'
import Link from 'next/link'

interface SearchResultProps {
    title: string
    subjectName: string
    subject: string
    name: string
}

const SearchResult = ({ title, subjectName, subject, name }: SearchResultProps) => {
    let Icon
    switch (subject) {
        case 'portugues':
            Icon = CaseSensitive
            break
        case 'geografia':
            Icon = Map
            break
        case 'historia':
            Icon = ScrollText
            break
        case 'sociologia':
            Icon = Speech
            break
        case 'filosofia':
            Icon = Brain
            break
        case 'artes':
            Icon = Brush
            break
        case 'ingles':
            Icon = BookOpenText
            break
        case 'espanhol':
            Icon = BookOpenText
            break
        case 'literatura':
            Icon = BookOpenText
            break
        case 'matematica':
            Icon = Sigma
            break
        case 'fisica':
            Icon = Atom
            break
        case 'quimica':
            Icon = FlaskConical
            break
        case 'biologia':
            Icon = Fish
            break
        case 'obras':
            Icon = LibraryBig
            break
        default:
            Icon = Sigma
            break
    }


    return (
        <Link className="block px-10 py-2" href={`/${subject}/${name}`}>
            <Icon className="absolute left-2 top-1/2 -translate-y-1/2" />
            <div className="flex flex-col">
                <h3 className="font-bold">{title}</h3>
                <span className="text-sm">{subjectName}</span>
            </div>
        </Link>
    )
}

export { SearchResult }