import { model, models, InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
    title: { type: String, required: true },
    static: { type: Boolean, default: false },
    subject: { type: String },
    level: { type: Number, min: 1, max: 3 },
    tags: [{ type: String }],
    contents: [{
        id: { type: String, required: true },
    }],
    excludedContents: [{
        id: { type: String, required: true },
    }]
})

export type Topic = InferSchemaType<typeof schema>
export default models.topic || model('topic', schema)