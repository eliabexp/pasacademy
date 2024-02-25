import { tv } from 'tailwind-variants'

interface ContentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const article = tv({
    base: 'relative my-4 max-w-2xl break-words [&_.tableWrapper]:overflow-x-auto [&_[id]]:scroll-mt-16 [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-2 [&_blockquote]:rounded-md [&_blockquote]:border [&_blockquote]:px-3 [&_blockquote]:py-1 [&_blockquote]:text-sm [&_figcaption]:text-center [&_figcaption]:italic [&_figure]:my-2 [&_h2]:mb-2.5 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-1.5 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-bold [&_li]:my-1 [&_math]:text-lg [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:my-2 [&_p]:leading-6 [&_table]:my-3 [&_table]:w-full [&_table]:caption-bottom [&_table]:border-collapse [&_td]:border [&_td]:p-1 [&_th]:border [&_th]:p-1 [&_ul]:ml-6 [&_ul]:list-disc'
})

export default function Body({ className, children, ...rest }: ContentBodyProps) {
    return (
        <article className={article({ className })} {...rest}>
            {children}
        </article>
    )
}