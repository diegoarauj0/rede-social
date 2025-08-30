import { ISessionRepository } from "@contracts/repositories/session.repository"
import { ISessionEntityProps, SessionEntity } from "@entities/session.entity"
import { redis } from "@databases/redis.database"
import { v4 as uuidv4 } from "uuid"

interface IExpires {
  refresh: number
  access: number
}

export class SessionRepository implements ISessionRepository {
  public async save(session: SessionEntity, expires: IExpires): Promise<SessionEntity> {
    if (session.database) await this.remove(session)

    const sessionEntity = new SessionEntity({
      privateId: session.privateId,
      database: {
        createdAt: new Date(),
        accessId: uuidv4(),
        refreshId: uuidv4(),
      },
    })

    await Promise.all([
      redis.set(sessionEntity.accessKey, sessionEntity.stringify(), "EX", expires.access),
      redis.set(sessionEntity.refreshKey, sessionEntity.stringify(), "EX", expires.refresh),
    ])

    return sessionEntity
  }

  public async remove(session: SessionEntity): Promise<boolean> {
    if (!session.database) return false

    await Promise.all([redis.del(session.refreshKey), redis.del(session.accessKey)])

    return true
  }

  public create(session: Omit<ISessionEntityProps, "database">): SessionEntity {
    return new SessionEntity({
      privateId: session.privateId,
    })
  }

  public async findByAccessId(accessId: string, privateId: string): Promise<SessionEntity | null> {
    const falseSession = new SessionEntity({
      privateId: privateId,
      database: { accessId: accessId, createdAt: new Date(), refreshId: "" },
    })

    const stringSession = await redis.get(falseSession.accessKey)

    if (stringSession === null) {
      return null
    }

    const json = JSON.parse(stringSession)

    return new SessionEntity({
      privateId: json.privateId,
      database: { accessId: json.accessId, refreshId: json.refreshId, createdAt: json.createdAt },
    })
  }

  public async findByRefreshId(refreshId: string, privateId: string): Promise<SessionEntity | null> {
    const falseSession = new SessionEntity({
      privateId: privateId,
      database: { accessId: "", createdAt: new Date(), refreshId: refreshId },
    })

    const stringSession = await redis.get(falseSession.accessKey)

    if (stringSession === null) {
      return null
    }

    const json = JSON.parse(stringSession)

    return new SessionEntity({
      privateId: json.privateId,
      database: { accessId: json.accessId, refreshId: json.refreshId, createdAt: json.createdAt },
    })
  }
}
