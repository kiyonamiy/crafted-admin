import { useQuery } from "@tanstack/react-query";
import localforage from "localforage";
import { useCallback } from "react";

import { LocalKeyEnum } from "@/constants/local-key";
import { QueryKeyEnum } from "@/constants/query-key";
import * as UserService from "@/services/user";
import { CheckPermissionFunc } from "@/types/permissioin";

/**
 * 说明：理想情况下，当用户在操作的过程中权限发生更改时，后端将其 token 失效，配合前端 403 强制退出（所以只要进入应用时刷新即可）；暂时不考虑用户角色被更改（前端无法感知，应由后端做 token 失效）；
 */

interface Options {
  enabled?: boolean;
}

export const usePermissions = (options: Options = {}) => {
  const { enabled = true } = options;
  // permissions 变化，引起组件重新渲染
  const {
    data: permissions,
    fetchStatus,
    status,
  } = useQuery({
    queryKey: [QueryKeyEnum.PERMISSIONS],
    queryFn: async () => {
      const loginResult = await localforage.getItem(LocalKeyEnum.LOGIN_RESULT);
      if (loginResult == null) {
        return [];
      }
      return UserService.getPermissions().catch(() => []);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
    enabled,
  });

  // 外部如果在 hooks 中使用了 checkPermission，需要将 checkPermission 作为依赖项
  const checkPermission: CheckPermissionFunc = useCallback(
    (code?: string) => {
      if (code == null) {
        return true;
      }
      const isAuthorized =
        permissions?.some((p) => p.permissionCode === code) ?? false;
      return isAuthorized;
    },
    [permissions],
  );

  return {
    checkPermission,
    fetchStatus,
    status,
  };
};
