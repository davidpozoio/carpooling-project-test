export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto extends LoginDto {
  firstName: string;
  lastName: string;
  cellNumber: string;
  indentification: string;
}

export interface ErrorAuthResponse {
  message: string;
  code: string;
}
