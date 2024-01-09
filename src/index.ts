import express from 'express'
import logger from 'morgan'

import './connection/mongo'
import apiRouter from './routes'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', apiRouter)

app.get('/', (_, res) => {
  res.send('Hello, this is your Express server!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
