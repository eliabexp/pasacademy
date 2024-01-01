import { tv } from 'tailwind-variants'

interface ContentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const article = tv({
    base: 'mx-auto my-4 max-w-2xl [&_a]:cursor-pointer [&_a]:underline [&_a]:underline-offset-2 [&_abbr]:underline [&_h2]:mx-1 [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mx-1 [&_h3]:text-lg [&_h3]:font-bold [&_p]:my-2 [&_p]:leading-5 [&_table]:mx-auto [&_table]:my-3 [&_table]:border-collapse [&_td]:border [&_td]:p-1 [&_th]:border [&_th]:p-1'
})

export default function ContentBody({ className, children }: ContentBodyProps) {
    return <article className={article({ className })}>{children}</article>
}
