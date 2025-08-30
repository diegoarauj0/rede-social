import { register, type IRegisterBody } from "@api/auth"
import type { IApiUserData } from "@api/type"

export async function registerService(registerBody: IRegisterBody): Promise<{ user: IApiUserData }> {
  const response = await register(registerBody)

  return { user: response.data?.User as IApiUserData }
}
