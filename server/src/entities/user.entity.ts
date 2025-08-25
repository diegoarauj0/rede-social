export interface IUserJSON {
  privateId?: string
  publicId?: number
  username: string
  nickname: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity {
  public readonly database!: boolean
  public readonly privateId?: string
  public readonly publicId?: number
  public readonly createdAt?: Date
  public readonly email!: string
  public readonly username!: string
  public nickname!: string
  public password!: string
  public updatedAt?: Date

  constructor(props: Omit<UserEntity, "toJSON">) {
    Object.assign(this, props)
  }

  public toJSON(): IUserJSON {
    return {
      privateId: this.privateId,
      publicId: this.publicId,
      nickname: this.nickname,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
