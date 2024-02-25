import { Body, Title } from '@/layouts/Content'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        absolute: 'Política de privacidade',
    },
    robots: {
        index: false,
        follow: true,
    }
}

export default function Privacidade() {
    return (
        <main className="p-4">
            <Title title="Política de privacidade" subtitle="Data de vigência: 28/12/2023" />
            <Body>
                <p>
                    Estamos felizes em ver você aqui no PAS Academy! Neste texto você vai encontrar
                    a descrição de quais de seus dados são coletados ao usar o site, bem como a
                    maneira como eles são coletados, armazenados, protegidos e exibidos dentro da
                    plataforma
                </p>
                <p>
                    Se você tiver interesse em ler os nossos <strong>termos de serviço</strong>,
                    você pode fazê-lo <a href="/termos">clicando aqui</a>
                </p>
                <h2>Informações que coletamos</h2>
                <p>Para criar uma conta no PAS Academy, os seguintes dados são solicitados:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Informação</th>
                            <th>Finalidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nome</td>
                            <td>
                                O seu nome é o nome que será exibido no seu perfil do PAS Academy,
                                ele é usado para ser exibido no seu perfil e pode ser usado na sua
                                interface como uma forma de chamar você, o PAS Academy não exige que
                                você use seu nome real, apenas recomenda para que ele seja usado
                                como forma de tratamento.
                            </td>
                        </tr>
                        <tr>
                            <td>Nome de usuário</td>
                            <td>
                                Seu nome de usuário é o nome exibido em interações na aba de
                                comunidade do site, ele serve como identificador do seu perfil e
                                pode ser escolhido de acordo com a preferência do usuário, desde que
                                não inflinja nossas regras de nome de usuário.
                            </td>
                        </tr>
                        <tr>
                            <td>E-mail</td>
                            <td>
                                Seu endereço de e-mail é o identificador de login que é vinculado à
                                sua conta, apenas você pode vê-lo.
                            </td>
                        </tr>
                        <tr>
                            <td>Gênero</td>
                            <td>
                                Essa informação é completamente opcional e usada apenas para a
                                exibição de pronomes, somente você pode ver esta informação.
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <strong>Nota:</strong> Não realizamos o uso de senhas como método de
                    autenticação, mas sim tokens, isso faz com que o acesso à conta seja mais seguro
                    e menos vulnerável a ataques cibernéticos relacionados a roubo de senhas.
                </p>
            </Body>
        </main>
    )
}
