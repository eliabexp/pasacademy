import { model, models, InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
    token: { type: String, required: true, unique: true },
    identifier: { type: String, required: true },
    expires: { type: Date, required: true },
})

export type Token = InferSchemaType<typeof schema>
export default models.token || model('token', schema)