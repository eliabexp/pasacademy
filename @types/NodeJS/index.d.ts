declare namespace NodeJS {
    interface ProcessEnv {
        API_URL: string
        FACEBOOK_CLIENT_ID: string
        FACEBOOK_CLIENT_SECRET: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string
        MONGODB_URI: string
        SMTP_USER: string
        SMTP_PASSWORD: string
        SMTP_HOST: string
        SMTP_PORT: number
    }
}