import { tv } from 'tailwind-variants'

interface ContentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const article = tv({
    base: 'relative mx-auto my-4 max-w-2xl [&_a]:cursor-pointer [&_a]:underline [&_a]:underline-offset-2 [&_abbr]:underline [&_h2]:mb-2.5 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_math]:text-lg [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:my-2 [&_p]:leading-5 [&_table]:mx-auto [&_table]:my-3 [&_table]:border-collapse [&_td]:border [&_td]:p-1 [&_th]:border [&_th]:p-1 [&_ul]:ml-6 [&_ul]:list-disc'
})

export default function ContentBody({ className, children, ...rest }: ContentBodyProps) {
    return (
        <article className={article({ className })} {...rest}>
            {children}
        </article>
    )
}
