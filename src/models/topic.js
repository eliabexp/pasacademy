import { model, models, Schema } from 'mongoose'

export default models.topic || model('topic', new Schema({
    name: { type: String, required: true },
    user: {
        account: { type: Boolean, default: false },
        new: { type: Boolean, default: false },
        teacher: { type: Boolean, default: false },
    },
    subject: { type: String },
    level: { type: Number, min: 1, max: 3 },
    weight: { type: Number, min: 0, max: 100 },
    tags: [String],
    createdAt: { type: Date },
    properties: {
        viewed: { type: Boolean },
        liked: { type: Boolean },
        saved: { type: Boolean },
        shared: { type: Boolean },
        mostViewed: { type: Boolean },
        mostLiked: { type: Boolean }
    },
    contents: [{
        id: { type: String, required: true },
        priority: { type: Number, min: 0, max: 100, default: 0 },
    }],
    excludedContents: [{
        id: { type: String, required: true },
    }],
    type: { type: String, enum: ['content', 'work', 'all'], default: 'content' },
}))