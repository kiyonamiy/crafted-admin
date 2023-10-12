import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

import { QueryKeyEnum } from "@/constants/query-key";
import { UserService } from "@/services/user";

function PersonalInformation() {
  const { data: userInfo, fetchStatus } = useQuery({
    queryKey: [QueryKeyEnum.GET_USER_INFO],
    queryFn: UserService.getUserInfo,
  });
  if (fetchStatus === "fetching") {
    return <Spin />;
  }
  return (
    <div>
      {JSON.stringify(userInfo)}
      <div style={{ height: 1000, width: 20, background: "red" }}></div>
    </div>
  );
}

export default PersonalInformation;
