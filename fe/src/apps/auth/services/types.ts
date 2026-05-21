export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthPayload {
  user: any;
  accessToken?: string;
  refreshToken?: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  password: string;
  confirmPassword: string;
}
