import bcrypt from 'bcrypt'
import UserModel from '../models/user'

interface NewUserInput {
  email: string
  firstName: string
  lastName: string
  password: string
}

const saltOrRounds = 10

export const register = async ({ firstName, lastName, email, password }: NewUserInput): Promise<void> => {
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

export const UserController = {
  register
}
