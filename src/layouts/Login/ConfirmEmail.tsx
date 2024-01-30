import Image from 'next/image'

export default function ConfirmEmail() {
    return (
        <>
            <Image
                src="/assets/icons/mail-sent.svg"
                alt="Email enviado"
                width="540"
                height="511"
                className="mx-auto my-8 w-8/12 max-w-96"
            />
            <h1 className="my-4 text-2xl font-bold">Verifique seu email</h1>
            <p className="mx-4">
                Enviamos um link para que você possa fazer seu login num passe de mágica!
            </p>
        </>
    )
}
