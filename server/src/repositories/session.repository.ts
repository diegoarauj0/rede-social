import { ISessionRepository } from "@contracts/repositories/session.repository"
import { SessionEntity } from "@entities/session.entity"
import { redis } from "@databases/redis.database"

export class SessionRepository implements ISessionRepository {
  public async save(
    session: SessionEntity,
    expires: { refresh: number; access: number },
  ): Promise<SessionEntity> {
    if (session.database) {
      throw new Error("Cannot save a session that already exists in the database.")
    }

    const newSession = new SessionEntity({
      ...session,
      createdAt: new Date(),
      database: true,
    })

    const { privateId, accessId, refreshId } = session

    await Promise.all([
      redis.set(`sessions:${privateId}:${accessId}`, newSession.stringify(), "EX", expires.access),
      redis.set(`sessions:${privateId}:${refreshId}`, newSession.stringify(), "EX", expires.refresh),
    ])

    return newSession
  }

  public createSession(session: Omit<SessionEntity, "createdAt" | "database" | "stringify">): SessionEntity {
    return new SessionEntity({
      database: false,
      privateId: session.privateId,
      refreshId: session.refreshId,
      accessId: session.accessId,
    })
  }
}
