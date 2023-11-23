import useReqQuery from "@/hooks/request/query";
import { UserInfo } from "@/types/base";

export const useUserInfoQuery = () => {
  const userInfoQuery = useReqQuery<UserInfo>({
    url: "/ca/user-info",
  });

  return userInfoQuery;
};
