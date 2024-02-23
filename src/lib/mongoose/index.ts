import { connect, connection } from 'mongoose'

export default async function startDB(database: string = 'platformDB') {
    if (connection.readyState === 1) {
        return
    }

    await connect(process.env.MONGODB_URI, { ignoreUndefined: true, dbName: 'platformDB' })
}
