import { model, models, InferSchemaType, Schema } from 'mongoose'

const subjectsId: { [key: string]: number } = {
    'portugues': 10,
    'geografia': 11,
    'historia': 12,
    'sociologia': 13,
    'filosofia': 14,
    'artes': 15,
    'ingles': 16,
    'espanhol': 17,
    'frances': 18,
    'educacaofisica': 19,
    'matematica': 20,
    'fisica': 21,
    'quimica': 22,
    'biologia': 23,
    'obras': 30,
}
const subjects = Object.keys(subjectsId)

const contentSchema = new Schema({
    question: { type: String, required: true },
    alternatives: [{
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        explanation: { type: String }
    }]
})

const schema = new Schema({
    id: { type: String, required: true, unique: true },
    subject: { type: String, enum: subjects, required: true },
    level: { type: Number, required: true },
    year: { type: Number, required: true },
    difficulty: { type: Number, min: 1, max: 3 },
    institution: { type: String, required: true },
    number: { type: Number }, 
    type: { type: String, enum: ['a', 'b', 'c', 'd'], required: true },
    contents: [{ type: String }],
    content: { type: contentSchema, required: true }
})
.pre('validate', async function(this: any, next) {
    if(this.isNew) {
        // Generate question id
        const { year, level, difficulty, number } = this
        const subjectId = subjectsId[this.subject]
        this.id = subjectId + level + String(year).slice(-2) + difficulty + number
    }

    next()
})

export type Question = InferSchemaType<typeof schema>
export default models.question || model('question', schema)