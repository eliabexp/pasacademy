import { model, models, InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    subjects: [{ type: String }],
    level: { type: Number, min: 1, max: 3 },
    fixedSort: { type: Boolean, default: false },
    priority: { type: Number, min: 0, max: 5, default: 0 },
    contents: [{
        id: { type: String, required: true },
    }],
    excludedContents: [{
        id: { type: String, required: true },
    }],
    sort: { type: String, enum: ['views', 'new'] },
    type: { type: String, enum: ['content', 'main'] },
})

export type Topic = InferSchemaType<typeof schema>
export default models.topic || model('topic', schema)