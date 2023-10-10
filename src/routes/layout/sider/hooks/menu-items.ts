import { MenuProps } from "antd";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RouteKeyEnum, RoutePathEnum } from "@/constants/route-path";
import { usePermissions } from "@/hooks/permissions";

export const useMenuItems = () => {
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();

  const generateMenuItems = useCallback(
    (parentKey?: RouteKeyEnum): MenuProps["items"] => {
      const result: MenuProps["items"] = [];
      Object.entries(RoutePathEnum).forEach(([key, value]) => {
        if (value?.parentKey === parentKey) {
          // 符合权限的 menu
          if (
            value.menu != null &&
            (value.permissionCodes == null ||
              value.permissionCodes.every(checkPermission))
          ) {
            const menu: {
              key: string;
              label: string;
              icon?: React.ReactNode;
              children?: MenuProps["items"];
              onClick?: () => void;
            } = {
              key,
              label: value.description,
              icon: value.menu.icon,
            };
            const children = generateMenuItems(key as RouteKeyEnum);
            if (children != null && children.length > 0) {
              menu.children = children;
            } else {
              // 只有“叶子节点”点击才跳页
              menu.onClick = () => {
                navigate(value.path);
              };
            }
            result.push(menu);
          }
        }
      });
      return result;
    },
    [checkPermission],
  );

  const menuItems = useMemo(
    () => generateMenuItems(RouteKeyEnum.ROOT),
    [generateMenuItems],
  );
  return menuItems;
};
