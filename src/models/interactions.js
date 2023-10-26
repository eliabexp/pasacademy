export default models.interactions || model('interactions', new Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, enum: ['content', 'question'], required: true },
    comments: [{
        userId: { type: String, required: true },
        comment: { type: String, required: true },
        date: { type: Date, required: true },
        id: { type: String, required: true }
    }],
    statistics: {
        views: [{
            date: { type: Date, required: true },
            userId: { type: String, required: true },
        }],
        likes: [{
            date: { type: Date, required: true },
            userId: { type: String, required: true, unique: true },
        }],
        shares: [{
            date: { type: Date, required: true },
            userId: { type: String, required: true },
        }]
    },
    questionStatistics: {
        skips: [{
            date: { type: Date, required: true },
            userId: { type: String, required: true },
        }],
        answers: [{
            date: { type: Date, required: true },
            userId: { type: String, required: true },
            answer: { type: String, required: true },
            timeElapsed: { type: Number, required: true }
        }]
    }
}))