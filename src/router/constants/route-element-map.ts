import { RouteKeyEnum } from "@/constants/route-object";

export const RouteElementMap = {
  [RouteKeyEnum.ROOT]: import("@/layout"),
  [RouteKeyEnum.LOGIN]: import("@/modules/base/pages/login"),
  [RouteKeyEnum.PAGE_403]: import("@/modules/base/pages/login"),
  [RouteKeyEnum.PAGE_404]: import("@/modules/base/pages/login"),
} as const;
