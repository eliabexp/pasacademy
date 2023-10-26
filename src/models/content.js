import { model, models, Schema } from 'mongoose'

const subjectsId = {
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

export default models.content || model('content', new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, lowercase: true, required: true, index: true },
    subject: { type: String, enum: subjects, required: true },
    level: { type: Number, min: 1, max: 3, required: true },
    weight: { type: Number, min: 0, max: 100 },
    createdAt: { type: Date, default: Date.now() },
    author: { type: String, default: 'PAS Academy' },
    thumb: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    exercises: [{
        question: { type: String, required: true },
        image: { type: String },
        type: { type: String, enum: ['a', 'b', 'c'], required: true },
        alternatives: [{
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
            explanation: { type: String }
        }],
        difficulty: { type: Number, min: 1, max: 3 },
    }],
    tags: [{ type: String }],
})
.pre('validate', async function(next) {
    // Generate id
    if(this.isNew) {
        do {
            this.id = subjectsId[this.subject] + this.level + String(Math.floor(Math.random() * 100000)).padStart(5, '0')
        }
        while(await this.constructor.findOne({ id: this.id }))
    }

    next()
}))