import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { RoutePathEnum } from "@/constants/route-path";

export const useMenuKey = () => {
  const { pathname } = useLocation();

  const selectedKey = useMemo(() => {
    const result = Object.entries(RoutePathEnum).find(([, value]) => {
      if (pathname === value.path) {
        return true;
      }
    });
    if (result == null) {
      throw new Error(
        `selectedKey that matches “${pathname}” not found, please check`,
      );
    }
    return result[0];
  }, [pathname]);

  const openKeys = useMemo(() => {
    const result: string[] = [];
    const recursive = (openKey: string) => {
      result.push(openKey);
      Object.entries(RoutePathEnum).forEach(([key, value]) => {
        if (key === openKey && value.parentKey != null) {
          recursive(value.parentKey);
        }
      });
    };
    recursive(selectedKey);
    return result;
  }, [selectedKey]);

  return {
    selectedKeys: [selectedKey],
    openKeys,
  };
};
