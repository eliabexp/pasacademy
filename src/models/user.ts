import { model, models, InferSchemaType, Schema } from 'mongoose'

const accountSchema = new Schema({
    email: { type: String, lowercase: true, minlength: 6, maxlength: 254, required: true, unique: true },
    permissions: [{ type: String, enum: ['contentCreator', 'contentModerator', 'communityModerator', 'userModerator', 'admin']}],
    plusSubscription: { 
        active: { type: Boolean, default: false },
        expiresAt: { type: Date },
        paymentHistory: [{
            date: { type: Date, required: true },
            value: { type: Number, required: true },
            product: { type: String, required: true },
            transactionId: { type: String, required: true },
        }]
    }
})
const profileSchema = new Schema({
    name: { type: String, minlength: 2, maxlength: 22, required: true },
    gender: { type: String, enum: ['m', 'f', 'u'], default: 'u' },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    level: { type: Number, min: 1, max: 3, default: 1 },
    username: { type: String, minlength: 2, maxlength: 22 },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now(), immutable: true },
    lastLoginAt: { type: Date }
})
const studySchema = new Schema({
    contents: {
        viewed: [{
            id: { type: String, required: true },
            times: [{ type: Date, default: Date.now() }],
        }],
        saved: [{ id: { type: String, required: true } }],
    },
    questions: {
        done: [{
            id: { type: String, required: true },
            date: { type: Number, default: Date.now() },
        }],
        saved: [{ id: { type: String, required: true } }],
    }
})

const schema = new Schema({
    id: { type: String, required: true, index: true, unique: true, immutable: true },
    account: { type: accountSchema, required: true },
    profile: { type: profileSchema, required: true },
    study: { type: studySchema }
})
.pre('validate', async function(this: any, next) {
    if(this.isNew) {
        // Generate user id
        do {
            this.id = '1' + String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')
        }
        while(await this.constructor.findOne({ id: this.id }))
    }

    next()
})

export type User = InferSchemaType<typeof schema>
export default models.user || model('user', schema)