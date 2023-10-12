import { LocalKeyEnum } from "@/constants/local-key";
import { Permission } from "@/types/permissioin";

import { LocalStorageUtils } from "./local-storage";

export const checkPermission = (code?: string) => {
  const permissions = LocalStorageUtils.getItem<Permission[]>(
    LocalKeyEnum.PERMISSIONS,
  );
  if (code == null) {
    return true;
  }
  const isAuthorized =
    permissions?.some((p) => p.permissionCode === code) ?? false;
  return isAuthorized;
};
