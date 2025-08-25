import { SessionEntity } from "@entities/session.entity"

export interface ISessionRepository {
  save: (session: SessionEntity, expires: { refresh: number; access: number }) => Promise<SessionEntity>
  createSession: (user: Omit<SessionEntity, "createdAt" | "database" | "stringify">) => SessionEntity
}
