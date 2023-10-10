import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

import { QueryKeyEnum } from "@/constants/query-key";
import * as UserService from "@/services/user";

function RoleManagement() {
  const { fetchStatus } = useQuery({
    queryKey: [QueryKeyEnum.GET_ROLE_LIST],
    queryFn: UserService.getRoleList,
    retry: false,
    staleTime: 0,
    cacheTime: 0,
  });
  if (fetchStatus === "fetching") {
    return <Spin />;
  }
  return <div>RoleManagement</div>;
}

export default RoleManagement;
