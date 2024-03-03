import { InferSchemaType, model, models, Schema } from 'mongoose'

const schema = new Schema({
    token: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    expires: { type: Date, default: Date.now() + 1000 * 60 * 60 * 12 },
    createdAt: { type: Date, default: Date.now() },
    type: { type: String, enum: ['email', 'redirect'], required: true },
})

export type Token = InferSchemaType<typeof schema>
export default models.token || model('token', schema)
