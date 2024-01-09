import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI ?? ''

const connectionMongo = (): void => {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('[MONGO] MongoDB Service is Available')
    })
    .catch(async mongoError => {
      try {
        const date = new Date()
        const formatDate = date.toISOString().slice(0, 19)
        console.log(`DATE: [${formatDate}] - ERROR: [${mongoError.message}]`)
        setTimeout(connectionMongo, 10000)
      } catch (error) {
        console.log('connectionMongo -> error', error)
      }
    })
}

connectionMongo()

mongoose.connection.on('connected', function () {
  console.log('[MONGO] Mongo is already connected')
})

mongoose.connection.on('error', function (err) {
  console.log('[MONGO] Mongoose default connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
  console.log('[MONGO] Mongoose default connection disconnected')
})
