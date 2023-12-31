'use client'

export default function SignUp({ createAccount }: { createAccount: (formData: FormData) => void }) {
    return (
        <>
            <h1 className="mb-8 text-center text-3xl font-bold">
                Seja bem-vindo ao
                <br />
                Pas Academy!
            </h1>
            <form action={createAccount}>
                <div className="mx-auto mb-6 w-72">
                    <label htmlFor="email" className="mb-1 ml-2 block text-left">
                        Como quer ser chamado?
                    </label>
                    <input
                        autoComplete="name"
                        className="w-full rounded-2xl border bg-transparent px-3 py-2 text-sm outline-white"
                        id="name"
                        minLength={2}
                        maxLength={22}
                        name="name"
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        placeholder="Digite seu nome"
                        title="Seu nome não pode conter números ou caracteres especiais"
                        type="text"
                        required
                    />
                </div>
                <div className="mx-auto mb-6 w-72">
                    <label className="mb-1 ml-2 block text-left">Gênero (opcional)</label>
                    <span className="flex flex-row items-center gap-3">
                        <input type="radio" name="gender" id="m" value="m" />
                        <label htmlFor="m">Masculino</label>
                    </span>
                    <span className="flex flex-row items-center gap-3">
                        <input type="radio" name="gender" id="f" value="f" />
                        <label htmlFor="f">Feminino</label>
                    </span>
                    <span className="flex flex-row items-center gap-3">
                        <input type="radio" name="gender" id="u" value="u" defaultChecked />
                        <label htmlFor="u">Não selecionar</label>
                    </span>
                </div>
                <div className="mx-auto mb-6 w-72">
                    <label htmlFor="level" className="mb-1 ml-2 block text-left">
                        Qual etapa do PAS você vai fazer esse ano?
                    </label>
                    <select
                        className="w-full rounded-2xl border bg-transparent px-3 py-2 text-sm outline-white"
                        id="level"
                        name="level"
                        required
                    >
                        <option value="" hidden selected>
                            Selecione uma opção
                        </option>
                        <option value="1">1ª etapa</option>
                        <option value="2">2ª etapa</option>
                        <option value="3">3ª etapa</option>
                    </select>
                </div>
                <button
                    className="mx-auto mb-8 flex flex-row gap-3 rounded-xl bg-white px-4 py-2 font-bold text-black transition-colors duration-300 hover:bg-white/80 disabled:bg-white/60"
                    type="submit"
                >
                    Criar conta
                </button>
            </form>
            <p className="mx-4 [&_a]:underline [&_a]:underline-offset-2">
                Ao continuar, você concorda com nossos <a href="/termos">Termos de serviço</a> e
                nossa <a href="/privacidade">Política de privacidade</a>
            </p>
        </>
    )
}
