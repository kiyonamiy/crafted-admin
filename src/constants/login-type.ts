import { LoginType } from "@/types/base";

enum KeyEnum {
  NORMAL = "NORMAL",
  PHONE = "PHONE",
}

export const LoginTypeEnum: Record<
  KeyEnum,
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
