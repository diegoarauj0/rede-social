import { register, type IRegisterBody } from "@api/auth"
import type { IUserData } from "@api/http"

export async function registerService(registerBody: IRegisterBody): Promise<{ user: IUserData }> {
  const response = await register(registerBody)

  return { user: response.data.user as IUserData }
}
