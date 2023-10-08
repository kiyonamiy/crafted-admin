import { UserInfo } from "@/types/user";
import request from "@/utils/request";

export async function getUserInfo() {
  return request<UserInfo>({
    url: "/user/getUserInfo",
  });
}

export async function getRoleList() {
  return request({
    url: "/user/getRoleList",
  });
}
