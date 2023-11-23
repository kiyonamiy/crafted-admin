import { MenuProps } from "antd";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RouteKeyEnum } from "@/constants/route-key";
import { RouteObjectEnum } from "@/constants/route-object";

export const useMenuItems = () => {
  const navigate = useNavigate();

  const generateMenuItems = useCallback(
    (parentKey?: RouteKeyEnum): MenuProps["items"] => {
      const result: MenuProps["items"] = [];
      Object.entries(RouteObjectEnum).forEach(([key, value]) => {
        if (value?.parentKey === parentKey) {
          // 符合权限的 menu
          if (
            value.menu != null
            // TODO 权限
            // &&
            // (value.permissionCodes == null ||
            //   value.permissionCodes.every(checkPermission))
          ) {
            const menu: {
              key: RouteKeyEnum;
              label: string;
              icon?: React.ReactNode;
              children?: MenuProps["items"];
              onClick?: () => void;
              onOpenChange?: () => void;
            } = {
              key: key as RouteKeyEnum,
              label: value.description,
              icon: value.menu.icon,
            };
            const children = generateMenuItems(key as RouteKeyEnum);
            if (children != null && children.length > 0) {
              menu.children = children;
            } else {
              // “叶节点”点击跳页
              menu.onClick = () => {
                navigate(value.path);
              };
            }
            // 如果底下子模块都没权限，则不显示当前节点
            if (
              !(
                Object.values(RouteObjectEnum).some(
                  ({ parentKey }) => parentKey === (key as RouteKeyEnum),
                ) && children?.length === 0
              )
            ) {
              result.push(menu);
            }
          }
        }
      });
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const menuItems = useMemo(
    () => generateMenuItems(RouteKeyEnum.ROOT),
    [generateMenuItems],
  );
  return menuItems;
};
