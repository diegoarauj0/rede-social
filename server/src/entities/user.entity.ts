export interface IUserData {
  privateId?: string
  publicId?: number
  username: string
  nickname: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserEntityProps {
  username: string
  nickname: string
  password: string
  email: string
  database?: {
    privateId: string
    publicId: number
    createdAt: Date
    updatedAt: Date
  }
}

export class UserEntity {
  public readonly database: boolean
  public readonly privateId?: string
  public readonly publicId?: number
  public readonly createdAt?: Date
  public readonly email: string
  public readonly username: string
  public nickname!: string
  public password!: string
  public updatedAt?: Date

  constructor(props: IUserEntityProps) {
    this.username = props.username
    this.nickname = props.nickname
    this.password = props.password
    this.email = props.email
    this.database = false

    if (props.database) {
      this.createdAt = props.database.createdAt
      this.updatedAt = props.database.updatedAt
      this.privateId = props.database.privateId
      this.publicId = props.database.publicId
      this.database = true
    }
  }

  public toUserData(): IUserData {
    return {
      privateId: this.privateId,
      publicId: this.publicId,
      nickname: this.nickname,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
