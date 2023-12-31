import { model, models, InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
    token: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    expires: { type: Date, default: Date.now() + 1000 * 60 * 60 * 12 },
    createdAt: { type: Date, default: Date.now() }
})

export type Token = InferSchemaType<typeof schema>
export default models.token || model('token', schema)
