import { LoginTypeEnum } from "../constants/login-type";

export type LoginType =
  | typeof LoginTypeEnum.NORMAL.code
  | typeof LoginTypeEnum.PHONE.code;
