import Search from './Search'

export default function Header() {
    return (
        <div className="grow md:pl-4">
            <Search placeholder="O que você quer aprender hoje?" />
        </div>
    )
}
