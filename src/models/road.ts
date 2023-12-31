import { model, models, InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: Number, min: 1, max: 3, required: true },
    subjects: [{ type: String, required: true }],
    contents: [
        {
            id: { type: String, required: true }
        }
    ]
})

export type Road = InferSchemaType<typeof schema>
export default models.road || model('road', schema)
