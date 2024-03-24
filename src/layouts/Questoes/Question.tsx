export default function Questions({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto mb-8 min-h-[calc(100svh-6rem)] w-full max-w-lg snap-start rounded-md border p-4 md:min-h-[calc(100svh-5rem)]">
            {children}
        </div>
    )
}
