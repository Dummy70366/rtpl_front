// import {
//   IRolePermissionData,
//   IUserPermissionData,
// } from "../rolePermission/RolePermissionInterface";

export interface User {
  id: number;
  email: string;
  timezone: string;
  name: string;
  username: null | string;
  roleId: number;
  isMailNotification: boolean;
  code: string;
  phone: string;
  birthDate: null | Date | string;
  gender: null | string;
  status: string;
  verified: boolean;
  profileImage: null | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface IUserData {
  id: number;
  name: string;
  email: string;
  timezone: string;
  roleId: number;
  phone: string;
  isMailNotification: boolean;
  birthDate: null | Date | string;
  status: string;
  verified: boolean;
  profileImage: null | string;
  createdAt: string;
  // roleData: {
  //   name: string;
  //   assignedPermissions: IRolePermissionData[];
  // };
  // userAssignedPermissions: IUserPermissionData[];
  featurePermissions?: { featureName: string; permissions: [] }[];
}

