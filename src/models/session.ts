import { InferSchemaType, model, models, Schema } from 'mongoose'

const schema = new Schema({
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    expires: { type: Date, default: Date.now() + 1000 * 60 * 60 * 24 * 30 },
    authorized: { type: Boolean, default: true },
    provider: { type: String, enum: ['google', 'facebook'] }
})

export type Session = InferSchemaType<typeof schema>
export default models.session || model('session', schema)
