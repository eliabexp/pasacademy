import Link from 'next/link'
import { Atom, BookOpenText, Brain, Brush, CaseSensitive, Fish, FlaskConical, LibraryBig, Map, ScrollText, Sigma, Speech } from 'lucide-react'

interface SearchOptionProps {
    title: string
    subjectTitle: string
    subject: string
    name: string
}

export default function SearchOption({ title, subjectTitle, subject, name }: SearchOptionProps) {
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
        case 'frances':
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
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <span>{subjectTitle}</span>
            </div>
        </Link>
    )
}
