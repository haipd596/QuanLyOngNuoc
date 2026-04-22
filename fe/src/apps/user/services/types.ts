export interface IUserRole {
  name: string;
}

export interface IUserMe {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  role: IUserRole;
  status: string;
  createdAt: string;
}
