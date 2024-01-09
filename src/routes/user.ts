import express, { type Request, type Response } from 'express'
import { type RequestCustom, auth } from '../middlewares/authorization'
import { UserController } from '../controllers/user'

const router = express.Router()

router.get('/info', auth, async (req: RequestCustom, res: Response) => {
  try {
    const { userId } = req

    const data = await UserController.getBasicInfo(userId)

    res.json({ success: true, message: 'User info', data })
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message })
  }
})

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body

    await UserController.register({
      firstName,
      lastName,
      email,
      password
    })

    res.json({ success: true, message: 'User created' })
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const token = await UserController.login({
      email,
      password
    })

    res.json({ success: true, message: 'User loged', data: { token } })
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message })
  }
})

export default router
