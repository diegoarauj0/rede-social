export interface ISessionEntityProps {
  privateId: string
  database?: {
    accessId: string
    refreshId: string
    createdAt: Date
  }
}

export class SessionEntity {
  public readonly database: boolean
  public readonly privateId: string
  public readonly createdAt?: Date
  public readonly accessId?: string
  public readonly refreshId?: string

  constructor(props: ISessionEntityProps) {
    this.privateId = props.privateId
    this.database = false

    if (props.database) {
      this.accessId = props.database?.accessId
      this.refreshId = props.database?.refreshId
      this.createdAt = props.database?.createdAt
      this.database = true
    }
  }

  get refreshKey(): string { return `sessions:${this.privateId}:${this.refreshId || "unknown"}` }

  get accessKey(): string { return `sessions:${this.privateId}:${this.accessId || "unknown"}` }

  public stringify(): string {
    return JSON.stringify({
      privateId: this.privateId,
      accessId: this.accessId,
      refreshId: this.refreshId,
      createdAt: this.createdAt,
    })
  }
}
