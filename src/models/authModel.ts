export interface LoginDto {
  username: string;
  password: string;
}

export interface ErrorAuthResponse {
  message: string;
  code: string;
}
