import { http, type ISuccessResponse } from "./http"

export interface ILoginBody {
  email: string
  password: string
}

export interface IRegisterBody {
  username: string
  email: string
  password: string
}

export async function login(body: ILoginBody): Promise<ISuccessResponse> {
  const response = await http.post<ISuccessResponse>("/auth/login", body)
  return response.data
}

export async function register(body: IRegisterBody): Promise<ISuccessResponse> {
  const response = await http.post<ISuccessResponse>("/auth/register", body)
  return response.data
}
