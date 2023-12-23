import { model, models, InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
    sessionToken: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    expires: { type: Date, required: true }
})

export type Session = InferSchemaType<typeof schema>
export default models.session || model('session', schema)