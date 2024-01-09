import express, { type Request, type Response } from 'express'
import { auth } from '../middlewares/authorization'

const router = express.Router()

router.get('/info', auth, (req: Request, res: Response) => {
  res.send('List of users')
})

router.post('/', (req: Request, res: Response) => {
  res.send('User created')
})

export default router
