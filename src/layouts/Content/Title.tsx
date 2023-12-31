interface ContentTitleProps {
    title: string
    subtitle: string
}

export default function ContentTitle({ title, subtitle }: ContentTitleProps) {
    return (
        <div className="mx-auto mb-6 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <span className="italic text-gray-200">{subtitle}</span>
        </div>
    )
}
