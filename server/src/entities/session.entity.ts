export class SessionEntity {
  public readonly database!: boolean
  public readonly privateId!: string
  public readonly createdAt?: Date
  public readonly accessId!: string
  public readonly refreshId!: string

  constructor(props: Omit<SessionEntity, "stringify">) {
    Object.assign(this, props)
  }

  public stringify(): string {
    return JSON.stringify({
      privateId: this.privateId,
      accessId: this.accessId,
      refreshId: this.refreshId,
      createdAt: this.createdAt,
    })
  }
}
