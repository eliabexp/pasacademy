import { InferSchemaType, model, models, Schema } from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    subjects: [{ type: String }],
    level: { type: Number, min: 1, max: 3 },
    authRequired: { type: Boolean },
    priority: { type: Number, min: 0, max: 5, default: 0 },
    type: { type: String, enum: ['contentRow', 'slide'] },
    contents: [{ id: { type: String, required: true } }],
    sort: { type: String, enum: ['views', 'new'] },
    image: { type: String },
    url: { type: String }
})

export type Topic = InferSchemaType<typeof schema>
export default models.topic || model('topic', schema)
