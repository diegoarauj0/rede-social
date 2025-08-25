import { Schema, model, Document } from "mongoose"

export interface IUser {
  username: string
  nickname: string
  password: string
  email: string
  createdAt: Date
  updatedAt: Date
  privateId: string
  publicId: number
}

export enum UserConstraints {
  MIN_USERNAME_LENGTH = 4,
  MAX_USERNAME_LENGTH = 16,
  MIN_PASSWORD_LENGTH = 8,
  MAX_PASSWORD_LENGTH = 64,
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: UserConstraints.MIN_USERNAME_LENGTH,
      maxlength: UserConstraints.MAX_USERNAME_LENGTH,
      unique: true,
      immutable: true,
    },
    nickname: {
      type: String,
      required: true,
      minlength: UserConstraints.MIN_USERNAME_LENGTH,
      maxlength: UserConstraints.MAX_USERNAME_LENGTH,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      minlength: UserConstraints.MIN_PASSWORD_LENGTH,
      maxlength: UserConstraints.MAX_PASSWORD_LENGTH,
      unique: true,
      immutable: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    createdAt: {
      type: Number,
      required: true,
      immutable: true,
    },
    updatedAt: {
      type: Number,
      required: true,
    },
    publicId: {
      type: Number,
      unique: true,
      required: true,
      immutable: true,
    },
    privateId: {
      type: String,
      unique: true,
      required: true,
      immutable: true,
    },
  }
)

export const userModel = model<IUser & Document>("user", userSchema)
