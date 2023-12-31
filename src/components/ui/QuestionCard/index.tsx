import Alternatives from './Alternatives'

export default function QuestionCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-lg border">
            {children}
        </div>
    )
}

export {
    Alternatives
}
