import { RouteKeyEnum } from "@/constants/route-key";

const RouteElementEnum: Record<
  RouteKeyEnum,
  Promise<{ default: () => JSX.Element }> | undefined
> = {
  [RouteKeyEnum.ROOT]: import("@/layout"),
  [RouteKeyEnum.LOGIN]: import("@/modules/base/pages/login"),
  [RouteKeyEnum.PERSONAL_INFORMATION]: import(
    "@/modules/base/pages/personal-information"
  ),
  [RouteKeyEnum.PAGE_403]: import("@/modules/base/pages/403"),
  [RouteKeyEnum.PAGE_404]: import("@/modules/base/pages/404"),
  [RouteKeyEnum.SYSTEM]: undefined,
  [RouteKeyEnum.ROLE_MANAGEMENT]: import("@/modules/system/role"),
};

export default RouteElementEnum;
