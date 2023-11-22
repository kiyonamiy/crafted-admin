import { useCallback, useEffect, useState } from "react";

import { RouteKeyEnum } from "@/constants/route-object";
import { useRouteFullPath } from "@/hooks/route";

export const useMenuKey = () => {
  // const [selectedKey] = useRoutePathKeyValue();
  const { key: selectedKey, parentKeys: selectedParentKeys = [] } =
    useRouteFullPath();

  // openKeys 两处触发变化：1. 随“叶节点”点击变化；2. 左侧菜单点击展开；
  const [openKeys, setOpenKeys] = useState<RouteKeyEnum[]>([]);

  // 1.随“叶节点”点击变化
  useEffect(() => {
    setOpenKeys((prevOpenKeys: RouteKeyEnum[]) => {
      return [...new Set([...prevOpenKeys, ...selectedParentKeys])];
    });
  }, [selectedKey, selectedParentKeys]);

  // 2. 左侧菜单点击展开
  const onOpenChange = useCallback((keys: string[]) => {
    // keys 只包含“父节点”，不包含“叶子节点”
    setOpenKeys(keys as RouteKeyEnum[]);
  }, []);

  return {
    selectedKeys: selectedKey != null ? [selectedKey] : [],
    openKeys,
    onOpenChange,
  };
};
