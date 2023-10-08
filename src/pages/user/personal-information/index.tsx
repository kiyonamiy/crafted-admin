import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

import { QueryKeyEnum } from "@/constants/query-key";
import * as UserService from "@/services/user";

function PersonalInformation() {
  const { data: userInfo, fetchStatus } = useQuery({
    queryKey: [QueryKeyEnum.GET_USER_INFO],
    queryFn: UserService.getUserInfo,
  });
  if (fetchStatus === "fetching") {
    return <Spin />;
  }
  return <div>{JSON.stringify(userInfo)}</div>;
}

export default PersonalInformation;
