import { InferSchemaType, model, models, Schema } from 'mongoose'

const subjectsId: { [key: string]: string } = {
    portugues: '10',
    geografia: '11',
    historia: '12',
    sociologia: '13',
    filosofia: '14',
    artes: '15',
    ingles: '16',
    espanhol: '17',
    frances: '18',
    literatura: '19',
    matematica: '20',
    fisica: '21',
    quimica: '22',
    biologia: '23',
    obras: '30'
}

const schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, lowercase: true, required: true, index: true },
    subject: { type: String, enum: Object.keys(subjectsId), required: true },
    subjectTitle: { type: String, required: true },
    level: { type: Number, min: 1, max: 3, required: true },
    weight: { type: Number, min: 0, max: 100 },
    createdAt: { type: Date, default: Date.now() },
    author: { type: String, default: 'Pas Academy' },
    thumb: { type: String },
    title: { type: String, maxLength: 96, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    tags: [{ type: String }],
    content: { type: String, required: true },
    exercises: [
        {
            question: { type: String, required: true },
            image: { type: String },
            type: { type: String, enum: ['a', 'b', 'c'], required: true },
            alternatives: [
                {
                    text: { type: String, required: true },
                    isCorrect: { type: Boolean, required: true },
                    explanation: { type: String }
                }
            ],
            difficulty: { type: Number, min: 1, max: 3 }
        }
    ],
    interactions: {
        comments: [
            {
                userId: { type: String, required: true },
                comment: { type: String, required: true },
                date: { type: Date, required: true },
                id: { type: String, required: true }
            }
        ],
        likes: [
            {
                date: { type: Date, required: true },
                userId: { type: String, required: true }
            }
        ],
        shares: [
            {
                date: { type: Date, required: true },
                userId: { type: String, required: true }
            }
        ],
        views: [
            {
                date: { type: Date, required: true },
                userId: { type: String, required: true }
            }
        ]
    }
}).pre('validate', async function (this: any, next) {
    if (this.isNew) {
        // Generate content id
        const subjectId = subjectsId[this.subject]

        do {
            this.id =
                subjectId +
                String(this.level) +
                String(Math.floor(Math.random() * 100000)).padStart(5, '0')
        } while (await this.constructor.findOne({ id: this.id }))
    }

    // Generate subject name
    const subjectTitles: { [key: string]: string } = {
        portugues: 'Português',
        geografia: 'Geografia',
        historia: 'História',
        sociologia: 'Sociologia',
        filosofia: 'Filosofia',
        artes: 'Artes',
        ingles: 'Inglês',
        espanhol: 'Espanhol',
        frances: 'Francês',
        literatura: 'Literatura',
        matematica: 'Matemática',
        fisica: 'Física',
        quimica: 'Quimica',
        biologia: 'Biologia',
        obras: 'Obra do PAS'
    }
    this.subjectTitle = subjectTitles[this.subject]

    next()
})

export type Content = InferSchemaType<typeof schema>
export default models.content || model('content', schema)
