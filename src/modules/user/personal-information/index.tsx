import { useEffect } from "react";

import { UserInfo } from "@/types/user";
import request from "@/utils/request";

function PersonalInformation() {
  useEffect(() => {
    request<UserInfo>({
      url: "/user/getUserInfo",
    })
      .then((res) => {
        console.log("请求成功，结果是", res);
      })
      .catch((error: string) => {
        console.log("请求失败，错误是", error);
      });
  }, []);
  return <div>PersonalInformation</div>;
}

export default PersonalInformation;
