export interface Permission {
  permissionName: string;
  permissionCode: string;
}

export type CheckPermissionFunc = (code?: string) => boolean;
