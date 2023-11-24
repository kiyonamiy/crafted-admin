import useReqQuery from "@/hooks/request/query";
import { UserInfo } from "@/types/base";

export enum QueryKeyEnum {
  USER_INFO = "USER_INFO",
}

export const useUserInfoQuery = () => {
  const userInfoQuery = useReqQuery<UserInfo>({
    queryKey: [QueryKeyEnum.USER_INFO],
    url: "/ca/user-info",
  });

  return userInfoQuery;
};
