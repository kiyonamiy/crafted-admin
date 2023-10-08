import { LoginType } from "@/types/base";

export const LoginTypeEnum: Record<
  "NORMAL" | "PHONE",
  {
    code: LoginType;
    description: string;
  }
> = {
  NORMAL: {
    code: 0,
    description: "账号登录",
  },
  PHONE: {
    code: 1,
    description: "手机登录",
  },
};
