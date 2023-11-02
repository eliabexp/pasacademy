'use client'

import { useSession } from 'next-auth/react'
import users, { type User } from '@/models/user'

export default function Welcome() {
    const { data, status } = useSession()

    // Get current time
    const date = new Date()
    const weekday = date.toLocaleString('en-us', { weekday: 'long' })
    const hour = date.getHours()
    const minHour = Math.floor(hour / 6) * 6

    let greeting

    if(status === 'authenticated' && data?.user && !data.user.id) greeting = '' // Wait for user to be loaded
    else {
        const name = data?.user.name || 'estudante'
        const p = data?.user.pronoun
    
        // Greetings
        const hourGreetings = () => ({
            day: [
                `Bem-vind${p} de volta, ${name}!`
            ],
            0: [
                `Boa madrugada, ${name}`,
                `Estudando a essa hora, ${name}?`
            ],
            6: [
                `Bom dia, ${name}`,
            ],
            12: [
                `Boa tarde, ${name}`,
            ],
            18: [
                `Boa noite, ${name}`,
            ]
        })
    
        const sundayGreetings = () => {
            const defaultGreetings = hourGreetings()
            defaultGreetings[12].push(`Boa tarde de domingo, ${name}`)
    
            return defaultGreetings
        }
        const mondayGreetings = () => {
            const defaultGreetings = hourGreetings()
            defaultGreetings[6].push(`Bom início de semana, ${name}`)
    
            return defaultGreetings
        }
        const fridayGreetings = () => {
            const defaultGreetings = hourGreetings()
            defaultGreetings[12].push(`Bom fim de semana, ${name}`)
    
            return defaultGreetings
        }
        const dayGreetings: { [key: string]: any } = {
            Sunday: sundayGreetings(),
            Monday: mondayGreetings(),
            Tuesday: hourGreetings(),
            Wednesday: hourGreetings(),
            Thursday: hourGreetings(),
            Friday: fridayGreetings(),
            Saturday: hourGreetings()
        }
    
        // Get random possible greeting
        const greetings = dayGreetings[weekday][minHour]
        greeting = greetings[Math.floor(Math.random() * greetings.length)]
    }

    return (
        <h2>{greeting}</h2>
    )
}