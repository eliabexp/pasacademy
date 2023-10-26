import { connect, connection } from 'mongoose'

export default async function startDB() {
    if(connection.readyState === 1) return

    await connect(process.env.MONGODB_URI, { ignoreUndefined: true })
    .then(() => console.log('Connected to MongoDB'))
}