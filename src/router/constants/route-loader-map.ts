import { RouteObject } from "react-router-dom";

import { RouteKeyEnum } from "@/constants/route-object";

export const RouteLoaderMap: Record<
  RouteKeyEnum,
  RouteObject["loader"] | undefined
> = {
  [RouteKeyEnum.ROOT]: undefined,
  [RouteKeyEnum.LOGIN]: undefined,
  [RouteKeyEnum.PAGE_403]: undefined,
  [RouteKeyEnum.PAGE_404]: undefined,
} as const;
