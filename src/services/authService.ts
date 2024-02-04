import { environment } from "../environment/config";
import axios from "../interceptor/globalInterceptor";
import { LoginDto } from "../models/authModel";

export function login(loginUser: LoginDto) {
  return axios.post(
    `${environment.HOST_BACK}/auth/login`,
    loginUser
  ) as Promise<{ message: string }>;
}

export function signup(signupUser: LoginDto) {
  return axios.post<{ message: string }>(
    `${environment.HOST_BACK}/auth/signup`,
    signupUser
  );
}

export function auth() {
  return axios.get(`${environment.HOST_BACK}/auth/me`) as Promise<unknown>;
}

export function logout() {
  return axios.get<{ message: string }>(`${environment.HOST_BACK}/auth/logout`);
}
