import { model, models, Schema } from 'mongoose'

export default models.user || model('user', new Schema({
    id: { type: String, required: true, index: true, unique: true, immutable: true },
    auth: [{
        provider: { type: String, enum: ['google', 'facebook', 'email'], required: true },
        providerAccountId: { type: String },
        accessToken: { type: String },
        idToken: { type: String },
        expiresAt: { type: Date },
    }],
    account: {  
        email: { type: String, lowercase: true, minlength: 6, maxlength: 254, required: true, unique: true },
        permissions: [{ type: String, enum: ['contentCreator', 'contentModerator', 'communityModerator', 'userModerator']}],
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
    },
    profile: {
        name: { type: String, minlength: 2, maxlength: 22, required: true },
        gender: { type: String, enum: ['m', 'f', 'u'], default: 'u' },
        level: { type: Number, min: 1, max: 3, required: true },
        avatar: { type: String },
        username: { type: String, minlength: 2, maxlength: 22 },
        role: { type: String, enum: ['student', 'teacher'], default: 'student' },
        createdAt: { type: Date, default: Date.now(), immutable: true },
        lastViewed: { type: Date }
    },
    study: {
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
    }
}).pre('validate', async function(next) {
    if(this.isNew) {
        // Generate id
        do {
            this.id = '1' + String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')
        }
        while(await this.constructor.findOne({ id: this.id }))
    }

    next()
}))