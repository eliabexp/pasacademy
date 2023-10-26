export interface Content {
    id: string
    name: string
    subject: string
    level: string
    weight?: number
    author?: string
    thumb?: string
    title: string
    content: string
}

export interface Question {
    id: string
    subject: string
    level: number
    year: number
    difficulty?: number
    institution: string
    number: number
    type: 'a' | 'b' | 'c' | 'd'
    contents: string[]
    content: {
        question: string
        alternatives: [{
            text: string
            isCorrect: boolean
            explanation?: string
        }]
    }
}

export interface User {
    id: string
    auth: [{
        provider: 'google' | 'facebook' | 'email'
        providerAccountId: string
    }]
    account: {
        email: string
        name: string
        image: string
    }
    profile: {
        name: string
        gender: 'm' | 'f' | 'u'
        level: number
        username?: string
        avatar?: string
        
    }
}