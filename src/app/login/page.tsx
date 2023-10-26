'use client'

import '@/styles/login.scss'
import Logo from '@/components/main/Logo'
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const gender = formData.get('gender')
    const level = formData.get('level')

    await fetch('/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gender, level })
    })
    .then((res) => {
        if(!res.ok) {
            signOut({ callbackUrl: '/login?error=CreateAccountError' })
        }

        return window.location.href = '/inicio'
    })
}

export default function Login() {
    const { data, status } = useSession()
    if(status === "authenticated" && data.user.id) window.location.href = '/inicio'

    const [error, setError] = useState('')
    const [gender, setGender] = useState('o(a)')
    const [name, setName] = useState('')

    const router = useRouter()
    const params = useSearchParams()
    useEffect(() => {
        if(!params.has('confirmarEmail')) router.replace('/login') // Remove error string from URL

        // Error handling
        const errorCode = params.get('error')
        if(errorCode) {
            switch(errorCode) {
                case 'CreateAccountError':
                    setError('Não foi possível criar sua conta. Tente novamente')
                    break
                case 'OAuthSignin':
                    setError('Não foi possível fazer login com a conta selecionada.')
                    break
                case 'OAuthCallback':
                    setError('Não foi possível fazer login com a conta selecionada.')
                    break
                case 'OAuthAccountNotLinked':
                    const provider = params.get('provider')
                    setError(`Sua conta do ${provider} não está vinculada à sua conta do pas.academy, para vincular sua conta, entre usando o seu e-mail`)
                    break
                case 'SessionRequired':
                    break
                case 'Verification':
                    setError('O token de verificação expirou.')
                    break
                default:
                    setError('Ocorreu um erro desconhecido.')
                    break
            }
        }
    }, [])

    // Email verification
    if(params.has('confirmarEmail')) {
        return (
            <>
            <header>
                <Logo/>
            </header>
            <main>
                <h1>Verifique seu e-mail</h1>
                <p>Enviamos um link para que você possa entrar na sua conta rapidamente!</p>
            </main>
            </>
        )
    }

    return (
        <>
        <header>
            <Logo/>
            {status === "authenticated" && <button className="logout" onClick={() => {signOut()}}>Sair</button>}
        </header>
        <main>
        {error && (
            <div className="error">
                <p><strong>Ocorreu um erro:</strong> {error}</p>
            </div>
        )}
        {status === "authenticated" ? (
            <>
            <h1>{`Seja bem-vind${gender}${name ? `, ${name}!` : ' ao pas.academy!'}`}</h1>
            <form onSubmit={handleSubmit}>
                <div className="input" id="name">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" placeholder={`Como quer ser chamad${gender}?`} pattern="[A-Za-zÀ-ÿ\s]+" minLength={2} maxLength={22} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="input" id="email">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" value={data?.user?.email || ''} disabled/>
                </div>
                <div className="input" id="gender">
                    <p>Gênero</p>
                    <div className="gender-select">
                        <input type="radio" name="gender" id="m" value="m" onClick={() => {setGender('o')}} required/>
                        <label htmlFor="m" className="gender-select">Masculino</label>
                    </div>
                    <div className="gender-select">
                        <input type="radio" name="gender" id="f" value="f" onClick={() => {setGender('a')}}/>
                        <label htmlFor="f" className="gender-select">Feminino</label>
                    </div>
                    <div className="gender-select">
                        <input type="radio" name="gender" id="u" value="u" onClick={() => {setGender('o(a)')}}/>
                        <label htmlFor="u" className="gender-select">Outros / Não selecionar</label>
                    </div>
                </div>
                <div className="input">
                    <label htmlFor="level">Qual etapa do PAS você vai fazer esse ano?</label>
                    <select name="level" id="level" required>
                        <option value="1">1ª etapa</option>
                        <option value="2">2ª etapa</option>
                        <option value="3">3ª etapa</option>
                    </select>
                </div>
                <button className="login" type="submit">Criar conta</button>
            </form>
            </>
        ) : (
            <>
            <h1>Tenha uma conta para toda a sua jornada de estudante</h1>
            <button className="oauth2" id="google" onClick={() => signIn('google')}><img src="/assets/icons/google.png" alt="Google" width="30"/>Entrar com Google</button>
            <button className="oauth2" id="facebook" onClick={() => signIn('facebook')}><img src="/assets/icons/facebook.png" alt="Facebook" width="30"/>Entrar com Facebook</button>
            <div className="divider">
                <span>ou</span>
            </div>
            <form id="login-form">
                <div className="input">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="Digite seu e-mail" autoComplete="on" required/>
                </div>
                <button className="login" type="submit">Continuar</button>
            </form>
            </>
        )}

            <p id="terms">Ao continuar, você concorda com nossos <a href="/termos">Termos de serviço</a> e nossa <a href="/privacidade">Política de privacidade</a></p>
        </main>
        </>
    )
}