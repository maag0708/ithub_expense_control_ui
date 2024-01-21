export interface Role {
  id: number;
  name: string;
}

export interface RolePermissions {
  id: number;
  name: string;
  permissions: string[];
}
