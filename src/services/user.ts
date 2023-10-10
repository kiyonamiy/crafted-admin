import { Permission } from "@/types/permissioin";
import { UserInfo } from "@/types/user";
import request from "@/utils/request";

export async function getUserInfo() {
  return request<UserInfo>({
    url: "/user/getUserInfo",
    method: "get",
  });
}

export async function getRoleList() {
  return request({
    url: "/user/getRoleList",
    method: "get",
  });
}

export async function getPermissions() {
  return request<Permission[]>({
    url: "/user/permissions",
    method: "get",
  });
}
