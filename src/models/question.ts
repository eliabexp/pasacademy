import { InferSchemaType, model, models, Schema } from 'mongoose'

const subjectsId: { [key: string]: number } = {
    portugues: 10,
    geografia: 11,
    historia: 12,
    sociologia: 13,
    filosofia: 14,
    artes: 15,
    ingles: 16,
    espanhol: 17,
    literatura: 19,
    matematica: 20,
    fisica: 21,
    quimica: 22,
    biologia: 23,
    obras: 30
}

const interactionsSchema = new Schema({
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
            userId: { type: String, required: true, unique: true }
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
})

const schema = new Schema({
    id: { type: String, required: true, unique: true },
    relations: {
        subject: { type: String, enum: Object.keys(subjectsId), required: true },
        works: [{ type: String }],
        level: { type: Number, required: true },
        year: { type: Number, required: true },
        difficulty: { type: Number, min: 1, max: 3 },
        institution: { type: String, required: true },
        type: { type: String, enum: ['trueOrFalse', 'multipleChoice', 'numeric'], required: true },
        tags: [{ type: String }],
    },
    content: { type: String },
    questions: [
        {
            content: { type: String, required: true },
            isCorrect: Boolean,
            alternatives: [
                {
                    content: { type: String, required: true },
                    isCorrect: { type: Boolean, required: true }
                }
            ],
            interactions: {
                answers: [
                    {
                        date: { type: Date, required: true },
                        userId: { type: String, required: true },
                        answer: { type: String, required: true },
                        timeElapsed: { type: Number, required: true }
                    }
                ],
                skips: [
                    {
                        date: { type: Date, required: true },
                        userId: { type: String, required: true }
                    }
                ]
            }
        }
    ],
    interactions: { type: interactionsSchema, required: true }
}).pre('validate', async function (this: any, next) {
    if (this.isNew) {
        // Generate question id
        const { year, level, difficulty } = this
        const subjectId = subjectsId[this.subjects[0]]
        this.id = subjectId + level + String(year).slice(-2) + difficulty
    }

    next()
})

export type Question = InferSchemaType<typeof schema>
export default models.question || model('question', schema)
