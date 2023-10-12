import { Permission } from "@/types/permissioin";
import { UserInfo } from "@/types/user";
import request from "@/utils/request";

export const UserService = {
  getUserInfo: async () => {
    return request<UserInfo>({
      url: "/user/getUserInfo",
      method: "get",
    });
  },
  getRoleList: async () => {
    return request({
      url: "/user/getRoleList",
      method: "get",
    });
  },
  getPermissions: async () => {
    return request<Permission[]>({
      url: "/user/permissions",
      method: "get",
    });
  },
};
