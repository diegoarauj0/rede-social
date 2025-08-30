import { http } from "./http"
import type { IApiResponse } from "./type"

export interface ILoginBody {
  email: string
  password: string
}

export interface IRegisterBody {
  username: string
  email: string
  password: string
}

export async function login(body: ILoginBody): Promise<IApiResponse<true>> {
  const response = await http.post<IApiResponse<true>>("/auth/login", body)
  return response.data
}

export async function register(body: IRegisterBody): Promise<IApiResponse<true>> {
  const response = await http.post<IApiResponse<true>>("/auth/register", body)
  return response.data
}
