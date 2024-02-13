import { tv } from 'tailwind-variants'

interface ContentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
interface ContentTitleProps {
    title: string
    subtitle: string
}

const article = tv({
    base: 'relative my-4 max-w-2xl [&_a]:underline [&_a]:underline-offset-2 [&_abbr]:underline [&_blockquote]:my-2 [&_blockquote]:rounded-md [&_blockquote]:border [&_blockquote]:px-3 [&_blockquote]:py-1 [&_blockquote]:text-sm [&_figcaption]:text-center [&_figcaption]:italic [&_figure]:my-2 [&_h2]:mb-2.5 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_math]:text-lg [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:my-2 [&_p]:leading-6 [&_table]:mx-auto [&_table]:my-3 [&_table]:border-collapse [&_td]:border [&_td]:p-1 [&_th]:border [&_th]:p-1 [&_ul]:ml-6 [&_ul]:list-disc'
})

const Body = ({ className, children, ...rest }: ContentBodyProps) => {
    return (
        <article className={article({ className })} {...rest}>
            {children}
        </article>
    )
}

const Title = ({ title, subtitle }: ContentTitleProps) => {
    return (
        <div className="mx-auto mb-6 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <span className="italic text-gray-400">{subtitle}</span>
        </div>
    )
}

export { Body, Title }
