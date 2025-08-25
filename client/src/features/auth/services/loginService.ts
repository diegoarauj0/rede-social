import { login, type ILoginBody } from "@api/auth"
import type { IUserData } from "@api/http"

export async function loginService(loginBody: ILoginBody): Promise<{ user: IUserData }> {
  const response = await login(loginBody)

  return { user: response.data.user as IUserData }
}
