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

export default models.question || model('question', new Schema({
    id: { type: String, required: true, unique: true },
    subject: { type: String, enum: subjects, required: true },
    level: { type: Number, required: true },
    year: { type: Number, required: true },
    difficulty: { type: Number, min: 1, max: 3 },
    institution: { type: String, required: true },
    number: { type: Number }, 
    type: { type: String, enum: ['a', 'b', 'c', 'd'], required: true },
    contents: [{ type: String }],
    content: {
        question: { type: String, required: true },
        alternatives: [{
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
            explanation: { type: String },
        }],
    }
})
.pre('validate', function(next) {
    if(this.isNew) {
        // Generate id
        const { year, level, difficulty, number } = this
        this.id = subjectsId[this.subject] + this.level + String(year).slice(-2) + this.difficulty + this.number
    }

    next()
}))