import { model, models, Schema } from 'mongoose'

export default models.trail || model('trail', new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: Number, min: 1, max: 3, required: true },
    subjects: [{ type: String, required: true }],
    contents: [{
        id: { type: String, required: true },
    }],
}))