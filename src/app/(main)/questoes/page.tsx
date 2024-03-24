import { Question } from '@/layouts/Questoes'

export default function Questoes() {
    return (
        <main className="flex h-full flex-col px-4">
            <style>{`
                html {
                    scroll-padding-top: 4rem;
                    scroll-snap-stop: always;
                    scroll-snap-type: y proximity;
                    scrollbar-width: none;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                }
            `}</style>
            <Question>
                <p className="mb-4 text-justify">
                    Na obra <strong>A desobediência civil</strong>, Henry David Thoreau critica a
                    ideia de que a escravidão deva ser considerada justa apenas por ter
                    fundamentação jurídica, questionando, dessa forma, a obediência incondicional à
                    lei, inclusive quando ela sustenta e fomenta comportamentos inumanos, injustos
                    ou discriminatórios. Por sua vez, na canção <strong>Cota não é esmola</strong>,
                    Bia Fereira defende as cotas raciais na universidade e denuncia o racismo e a
                    discriminação, especialmente em relação às mulheres negras e periféricas.
                </p>
                <p className="mb-4 italic">
                    Tendo como referência o conteúdo das obras anteriormente citadas, julgue os
                    seguintes itens.
                </p>
                <div className="rounded-md border p-4">
                    <p>
                        A ação afirmativa implantada nas universidades federais brasileiras sob o
                        formato da reserva de vagas — também conhecida como cotas — fere a igualdade
                        de direitos, visto que favorece uma parte da população em detrimento de
                        outras.
                    </p>
                </div>
            </Question>
            <Question>
                <p className="mb-4 text-justify">
                    Na obra <strong>A desobediência civil</strong>, Henry David Thoreau critica a
                    ideia de que a escravidão deva ser considerada justa apenas por ter
                    fundamentação jurídica, questionando, dessa forma, a obediência incondicional à
                    lei, inclusive quando ela sustenta e fomenta comportamentos inumanos, injustos
                    ou discriminatórios. Por sua vez, na canção <strong>Cota não é esmola</strong>,
                    Bia Fereira defende as cotas raciais na universidade e denuncia o racismo e a
                    discriminação, especialmente em relação às mulheres negras e periféricas.
                </p>
                <p className="mb-4 italic">
                    Tendo como referência o conteúdo das obras anteriormente citadas, julgue os
                    seguintes itens.
                </p>
                <div className="rounded-md border p-4">
                    <p>
                        A ação afirmativa implantada nas universidades federais brasileiras sob o
                        formato da reserva de vagas — também conhecida como cotas — fere a igualdade
                        de direitos, visto que favorece uma parte da população em detrimento de
                        outras.
                    </p>
                </div>
            </Question>
            <Question>
                <p className="mb-4 text-justify">
                    Na obra <strong>A desobediência civil</strong>, Henry David Thoreau critica a
                    ideia de que a escravidão deva ser considerada justa apenas por ter
                    fundamentação jurídica, questionando, dessa forma, a obediência incondicional à
                    lei, inclusive quando ela sustenta e fomenta comportamentos inumanos, injustos
                    ou discriminatórios. Por sua vez, na canção <strong>Cota não é esmola</strong>,
                    Bia Fereira defende as cotas raciais na universidade e denuncia o racismo e a
                    discriminação, especialmente em relação às mulheres negras e periféricas.
                </p>
                <p className="mb-4 italic">
                    Tendo como referência o conteúdo das obras anteriormente citadas, julgue os
                    seguintes itens.
                </p>
                <div className="rounded-md border p-4">
                    <p>
                        A ação afirmativa implantada nas universidades federais brasileiras sob o
                        formato da reserva de vagas — também conhecida como cotas — fere a igualdade
                        de direitos, visto que favorece uma parte da população em detrimento de
                        outras.
                    </p>
                </div>
            </Question>
        </main>
    )
}
