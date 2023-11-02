'use client'

import '@/styles/login.scss'
import Logo from '@/components/main/Logo'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


async function createAccount(formData: FormData) {
    const button = document.getElementById('register') as HTMLButtonElement
    button.disabled = true

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
        if(res.ok) window.location.href = '/inicio'
        
        window.location.href = '/login?error=CreateAccountError'
    })
}

export default function Registrar() {
    const { data, status } = useSession()
    if(status !== 'authenticated') redirect('/login')

    const [gender, setGender] = useState('o(a)')
    const [name, setName] = useState('')

    const email = data.user.email
    if(!email) return redirect('/login')

    return (
        <>
        <header>
            <Logo/>
            <a href="/login">Sair</a>
        </header>
        <main>
            <h1>{`Seja bem-vind${gender}${name ? `, ${name}!` : ' ao PAS Academy!'}`}</h1>
            <form action={createAccount}>
                <div className="input">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" placeholder={`Como quer ser chamad${gender}?`} pattern="[A-Za-zÀ-ÿ\s]+" autoComplete="name" minLength={2} maxLength={22} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="input">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" value={email} autoComplete="off" disabled/>
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
                <button className="login" type="submit" id="register">Criar conta</button>
            </form>
            <p id="terms">Ao continuar, você concorda com nossos <a href="/termos">Termos de serviço</a> e nossa <a href="/privacidade">Política de privacidade</a></p>
        </main>
        </>
    )
}