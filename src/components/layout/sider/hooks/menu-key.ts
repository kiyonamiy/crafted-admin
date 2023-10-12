import { useMemo } from "react";

import { useCurrentRoutePathKv } from "@/components/router/hooks/router";
import { RoutePathEnum } from "@/constants/route-path";

export const useMenuKey = () => {
  const [selectedKey] = useCurrentRoutePathKv();

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
    selectedKeys: selectedKey != null ? [selectedKey] : [],
    openKeys,
  };
};
