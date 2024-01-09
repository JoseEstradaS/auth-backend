import mongoose, { type Document, Schema } from 'mongoose'

export interface UserDocument extends Document {
  email: string
  firstName: string
  lastName: string
  password: string
  loginAttempts: number
  lockoutEndAt: Date
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  lockoutEndAt: { type: Date },
  loginAttempts: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model<UserDocument>('User', userSchema)
