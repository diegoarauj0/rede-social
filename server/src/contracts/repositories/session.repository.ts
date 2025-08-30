import { ISessionEntityProps, SessionEntity } from "@entities/session.entity"

export interface ISessionRepository {
  save: (session: SessionEntity, expires: { refresh: number; access: number }) => Promise<SessionEntity>
  create: (session: Omit<ISessionEntityProps, "database">) => SessionEntity
  remove: (session: SessionEntity) => Promise<boolean>
  findByAccessId: (accessId: string, privateId: string) => Promise<SessionEntity | null>
  findByRefreshId: (refreshId: string, privateId: string) => Promise<SessionEntity | null>
}
