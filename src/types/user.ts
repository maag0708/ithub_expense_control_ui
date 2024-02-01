
export interface User {
  aud: string;
  exp: number;
  groupsid: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid": string;
  ait: number;
  iss: string;
  nbf: number;
  prymarysid: string;
  unique_name: string;
  role: string;
  vendorID?: string;
}

export interface UserData {
  user: User | null;
}

export interface UserList {
  id: number;
  name: string;
}

export interface UserCreateProps {
  name: string;
  username: string;
  password: string;
  roleId: number;
}

export interface UserUpdateProps {
  id: number;
  name: string;
  username: string;
  roleId: number;
}

export interface UserUpdatePasswordProps {
  id: number;
  password: string;
}
