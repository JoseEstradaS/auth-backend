import express, { type Request, type Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('List of users')
})

router.post('/', (req: Request, res: Response) => {
  res.send('User created')
})

export default router
