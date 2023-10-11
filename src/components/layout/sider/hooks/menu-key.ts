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
    return result?.[0];
  }, [pathname]);

  const openKeys = useMemo(() => {
    const result: string[] = [];
    if (selectedKey == null) {
      return result;
    }
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
