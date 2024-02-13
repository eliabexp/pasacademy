import { Button, Heading, Html } from '@react-email/components'
import { type User } from '@/models/user'

interface MagicLinkProps {
    url: string
    user: User | null
}

export default function MagicLink({ url, user }: MagicLinkProps) {
    const pronouns: { [key: string]: string } = {
        m: 'o',
        f: 'a',
        u: 'o(a)'
    }

    return (
        <Html>
            <Heading>{user ? `Olá, ${user}` : 'Seja bem-vindo(a)'}</Heading>
            <p>
                $
                {user
                    ? `Bem-vind${pronouns[user.profile.gender]} de volta!`
                    : 'Que bom te conhecer!'}{' '}
                Para fazer login é só clicar no botão abaixo
            </p>
            <Button href={url}>Fazer Login</Button>
            <p>Esse link é válido por 12 horas.</p>
            <p>Bons estudos! 😉</p>
        </Html>
    )
}
