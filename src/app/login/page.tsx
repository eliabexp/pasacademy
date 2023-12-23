'use client'

import '@/styles/page.scss'
import Image from 'next/image'
import Logo from '@/components/main/Logo'
import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'

function ConfirmEmail() {
    return (
        <main className="login confirm-email">
            <h1>Verifique seu email!</h1>
            <p>Enviamos um link para que você possa fazer login rapidamente</p>
        </main>
    )

}

export default function Login() {
    // Redirecting
    const { data, status } = useSession()
    if(status === 'authenticated' && data.user.registered) redirect('/inicio')
    else if(status === 'authenticated' && !data.user.registered) redirect('/login/registrar')

    // Error handling
    const [error, setError] = useState('')
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
                setError('Esse meio de login não está vinculado à sua conta do PAS Academy, para vincular sua conta, entre usando o seu e-mail')
                break
            case 'Verification':
                setError('O token de verificação expirou.')
                break
            default:
                setError('Ocorreu um erro desconhecido.')
        }
    }, [errorCode])    

    return (
        <>
            <header>
                <Logo color="white" />
            </header>
            <main className="login">
                {error && (
                        <div className="error">
                            <p><strong>Ocorreu um erro:</strong> {error}</p>
                        </div>
                )}
                {params.has('confirmarEmail') ? (<ConfirmEmail />) : <>
                    <h1>Tenha uma conta para toda a sua jornada de estudante</h1>
                    <button className="oauth2" id="google" onClick={() => signIn('google')}><Image src="/assets/icons/google.png" alt="Google" width="30" height="30" />Continuar com Google</button>
                    <button className="oauth2" id="facebook" onClick={() => signIn('facebook')}><Image src="/assets/icons/facebook.png" alt="Facebook" width="30" height="30" />Continuar com Facebook</button>
                    <div className="divider">
                        <span>ou</span>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        const button = document.querySelector('button[type="submit"]') as HTMLButtonElement
                        button.setAttribute('disabled', 'true')
                        button.innerText = 'Carregando...'

                        const email = e.currentTarget.email.value
                        signIn('email', { email })
                    }}>
                        <div className="input">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" placeholder="Digite seu e-mail" autoComplete="email" required />
                        </div>
                        <button type="submit">Continuar</button>
                    </form>
                    <p id="terms">Ao continuar, você concorda com nossos <a href="/termos">Termos de serviço</a> e nossa <a href="/privacidade">Política de privacidade</a></p>
                </>}
            </main>
        </>
    )
}