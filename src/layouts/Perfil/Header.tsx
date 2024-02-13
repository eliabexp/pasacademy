import { SignOut } from '@/components/tools/SignOut'
import { useSession } from '@/hooks/auth'

export default function Header() {
    const user = useSession()
    if (!user) return null

    return (
        <>
            <h2>{user.name}</h2>
            <SignOut />
        </>
    )
}
