import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel, { type UserDocument } from '../models/user'

interface NewUserInput {
  email: string
  firstName: string
  lastName: string
  password: string
}

const saltOrRounds = 10
const jwtSecret = process.env.JWT_SECRET
const MAX_LOGIN_ATTEMPTS = Number(process.env.MAX_LOGIN_ATTEMPTS ?? 3)
const LOCKOUT_DURATION = Number(process.env.LOCKOUT_DURATION ?? 300000)

const register = async ({ firstName, lastName, email, password }: NewUserInput): Promise<void> => {
  const alreadyRegistered = await UserModel.exists({ email })

  if (alreadyRegistered) throw new Error('Email already registered')

  const hashedPassword = await bcrypt.hash(password, saltOrRounds)

  await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
  })
}

interface LoginArgs {
  email: string
  password: string
}

const login = async ({ email, password }: LoginArgs): Promise<string | undefined> => {
  const user = await UserModel.findOne({ email }).lean()

  if (!user) throw new Error('Incorrect email or password')
  if (user.lockoutEndAt > new Date()) throw new Error('Account is locked due to multiple failed login attempts. Please try again later.')

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    await UserModel.updateOne(
      { email },
      {
        $inc: { loginAttempts: 1 },
        $set: {
          lockoutEndAt: user.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS
            ? new Date(Date.now() + LOCKOUT_DURATION)
            : undefined
        }
      }
    )

    throw new Error('Incorrect email or password')
  }

  await UserModel.updateOne(
    { email },
    {
      $set: { loginAttempts: 0 },
      $unset: { lockoutEndAt: '' }
    }
  )

  if (!jwtSecret) throw new Error('JWT is not defined')

  const token = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRATION ?? '24h'
  })

  return token
}

const getBasicInfo = async (userId?: string): Promise<Pick<UserDocument, 'firstName' | 'lastName' | 'email'>> => {
  const user = await UserModel
    .findOne({ _id: userId })
    .select({ _id: 0, firstName: 1, lastName: 1, email: 1 })
    .lean()

  if (!user) throw new Error('User not found')

  return user
}

export const UserController = {
  getBasicInfo,
  login,
  register
}
