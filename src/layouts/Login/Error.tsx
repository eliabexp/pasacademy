interface ErrorProps {
    error: string | string[]
    type?: string
}

export default function Error({ error, type = 'error' }: ErrorProps) {
    let message = ''
    switch (error) {
        case 'access_denied':
            message = 'Você cancelou o login via Facebook'
            break
        case 'InvalidEmail':
            message = 'O email digitado não é válido'
            break
        case 'SendEmail':
            message = 'Não foi possível enviar um link para este email'
            break
        case 'CreateAccount':
            message = 'Desculpa, não foi possível criar sua conta no momento'
            break
    }
    return <div className="mb-4 rounded-xl bg-red-500 p-4">Ocorreu um erro: {message}</div>
}
