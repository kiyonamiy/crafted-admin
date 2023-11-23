import { LocalKeyEnum } from "@/constants/local-key";
import { Permission } from "@/types/base/permission";
import { LocalStorageUtils } from "@/utils/local-storage";

export const checkPermission = (code?: string) => {
  const permissions = LocalStorageUtils.getItem<
    Pick<Permission, "code" | "id">[]
  >(LocalKeyEnum.PERMISSIONS);
  if (code == null) {
    return true;
  }
  // 存在即满足
  const hasPermission = permissions?.some((p) => p.code === code) ?? false;
  return hasPermission;
};
