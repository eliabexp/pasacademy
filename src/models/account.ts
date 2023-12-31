import { model, models, InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
    userId: { type: String, required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    expires: { type: Date, required: true },
    type: { type: String, required: true }
})

export type Account = InferSchemaType<typeof schema>
export default models.account || model('account', schema)
