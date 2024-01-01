import Login from '@/layouts/Login'
import Logo from '@/components/ui/Logo'
import auth from '@/lib/auth'
import { WorkOS } from '@workos-inc/node'
import { redirect } from 'next/navigation'

const workos = new WorkOS(process.env.WORKOS_API_KEY)

export default async function LoginPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const user = await auth()
    if (user) redirect('/inicio')

    // SignIn properties
    // const facebookOAuthUrl = workos.userManagement.getAuthorizationUrl({
    //     clientId: process.env.WORKOS_CLIENT_ID,
    //     provider: 'FacebookOAuth',
    //     redirectUri: process.env.API_URL + '/api/auth/callback'
    // })
    const googleOAuthUrl = workos.userManagement.getAuthorizationUrl({
        clientId: process.env.WORKOS_CLIENT_ID,
        provider: 'GoogleOAuth',
        redirectUri: process.env.API_URL + '/api/auth/callback'
    })
    async function sendEmail(formData: FormData) {
        'use server'

        const body = Object.fromEntries(formData.entries())

        await fetch(process.env.API_URL + '/api/auth/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((res) => {
            if (res.ok) redirect('/login?confirmarEmail')

            redirect('/login?error=SendEmail')
        })
    }

    // SignUp properties
    async function createAccount(formData: FormData) {
        'use server'

        const body = Object.fromEntries(formData.entries())

        await fetch(process.env.API_URL + '/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((res) => {
            console.log(res.status)
            if (res.ok) redirect('/')

            redirect('/login?error=CreateAccount')
        })
    }

    function Container() {
        if (user === false) return <Login.SignUp createAccount={createAccount} />
        if (searchParams.confirmarEmail === '') return <Login.ConfirmEmail />
        return (
            <Login.SignIn
                facebookOAuthUrl={''}
                googleOAuthUrl={googleOAuthUrl}
                sendEmail={sendEmail}
            />
        )
    }

    return (
        <div className="h-svh bg-gradient-to-br from-primary via-blue-800 to-primary text-white">
            <header className="mx-auto flex h-[60px] max-w-screen-2xl items-center justify-between px-6">
                <Logo color="white" />
            </header>
            <main className="relative mx-auto mt-4 max-w-xl text-center">
                {searchParams.error && <Login.Error error={searchParams.error} />}
                <Container />
            </main>
        </div>
    )
}
