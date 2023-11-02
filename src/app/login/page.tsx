'use client'

import '@/styles/login.scss'
import Logo from '@/components/main/Logo'
import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { redirect, useSearchParams, type RedirectType } from 'next/navigation'

export default function Login() {
    const { data, status } = useSession()
    if(status === 'authenticated') redirect('/inicio', 'push' as RedirectType)

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')

    // Error handling
    const params = useSearchParams()
    const errorCode = params.get('error')
    useEffect(() => {
        if(!errorCode) return

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
                setError(`Esse meio de login não está vinculado à sua conta do PAS Academy, para vincular sua conta, entre usando o seu e-mail`)
                break
            case 'Verification':
                setError('O token de verificação expirou.')
                break
            default:
                setError('Ocorreu um erro desconhecido.')
                break
        }
    }, [errorCode])    

    if(params.has('confirmarEmail')) {
        // Confirm email page
        return (
            <>
            <header>
                <Logo/>
            </header>
            <main className="confirm-email">
                <h1>Verifique seu email!</h1>
                <p>Enviamos um link para que você possa fazer login rapidamente</p>
            </main>
            </>
        )
    }

    return (
        <>
        <header>
            <Logo/>
        </header>
        <main>
            {
                error && (
                    <div className="error">
                        <p><strong>Ocorreu um erro:</strong> {error}</p>
                    </div>
                )
            }
            { 
                <>
                <h1>Tenha uma conta para toda a sua jornada de estudante</h1>
                <button className="oauth2" id="google" onClick={() => signIn('google')}><img src="/assets/icons/google.png" alt="Google" width="30"/>Entrar com Google</button>
                <button className="oauth2" id="facebook" onClick={() => signIn('facebook')}><img src="/assets/icons/facebook.png" alt="Facebook" width="30"/>Entrar com Facebook</button>
                <div className="divider">
                    <span>ou</span>
                </div>
                <form>
                    <div className="input">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="Digite seu e-mail" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <button className="login" type="submit" onClick={(e) => signIn('email', { email, callbackUrl: '/login?confirmarEmail' })}>Continuar</button>
                </form>
                <p id="terms">Ao continuar, você concorda com nossos <a href="/termos">Termos de serviço</a> e nossa <a href="/privacidade">Política de privacidade</a></p>
                </>
            }
        </main>
        </>
    )
}