import Login from '@/layouts/Login'
import Logo from '@/components/ui/Logo'
import auth from '@/lib/auth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function LoginPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const user = await auth()
    if (user) redirect('/inicio')

    // SignIn properties
    const callbackUrl = `${process.env.API_URL}/auth/callback`
    const facebookOAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${callbackUrl}&state=facebook&scope=email`
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${callbackUrl}&client_id=${process.env.GOOGLE_CLIENT_ID}&state=google&scope=https%3A//www.googleapis.com/auth/userinfo.email+https%3A//www.googleapis.com/auth/userinfo.profile`

    async function sendEmail(formData: FormData) {
        'use server'

        const body = Object.fromEntries(formData.entries())

        await fetch(`${process.env.API_URL}/auth`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then((res) => {
            res.ok && redirect('/login?confirmarEmail')
            res.status === 400 && redirect('/login?error=InvalidEmail')

            redirect('/login?error=SendEmail')
        })
    }

    // SignUp action
    async function signUp(formData: FormData) {
        'use server'

        const body = Object.fromEntries(formData.entries())

        const session = await auth()
        if (session !== false) redirect('/login')

        const tokenName = `${process.env.NODE_ENV === 'development' ? '' : '__Secure-'}token`
        const cookie = cookies().get(tokenName)?.value

        await fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'Cookie': `${tokenName}=${cookie}` },
            body: JSON.stringify(body)
        }).then((res) => {
            res.ok && redirect('/')
            res.status === 400 && redirect('/login?error=InvalidData')
            redirect('/login')
        })
    }

    function Container() {
        if (user === false) return <Login.SignUp action={signUp} />
        if (searchParams.confirmarEmail === '') return <Login.ConfirmEmail />
        return (
            <Login.SignIn
                facebookOAuthUrl={facebookOAuthUrl}
                googleOAuthUrl={googleOAuthUrl}
                sendEmailAction={sendEmail}
            />
        )
    }

    return (
        <div className="min-h-svh bg-gradient-to-br from-primary via-blue-800 to-primary text-white">
            <header className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
                <Logo color="white" />
            </header>
            <main className="relative mx-auto mt-4 max-w-xl text-center">
                {searchParams.error && <Login.Error error={searchParams.error} />}
                <Container />
            </main>
        </div>
    )
}
