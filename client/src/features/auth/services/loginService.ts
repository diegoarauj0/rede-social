import { login, type ILoginBody } from "@api/auth"
import type { IApiUserData } from "@api/type"

export async function loginService(loginBody: ILoginBody): Promise<{ user: IApiUserData }> {
  const response = await login(loginBody)

  return { user: response.data?.User as IApiUserData }
}
