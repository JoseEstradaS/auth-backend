import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface RequestCustom extends Request {
  userId?: string
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const auth = async (req: RequestCustom, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const jwtSecret = process.env.JWT_SECRET

    if (!token) return res.status(401).json({ message: 'Token not provided' })
    if (!jwtSecret) return res.status(500).json({ message: 'JWT Secret is not defined' })

    const decoded = jwt.verify(token, jwtSecret)
    req.userId = (decoded as { userId: string }).userId
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
