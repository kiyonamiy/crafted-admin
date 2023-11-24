import useReqMutation from "@/hooks/request/mutation";
import { UserInfo } from "@/types/base";

export const useUpdateUserInfoMutation = () => {
  const mutation = useReqMutation<Partial<UserInfo>, void>({
    url: "/ca/manager/user/update",
    method: "post",
  });

  return mutation;
};

export const useUpdatePasswordMutation = () => {
  const mutation = useReqMutation<
    {
      oldPassword: string;
      newPassword: string;
    },
    void
  >({
    url: "/ca/manager/user/update/password",
    method: "post",
  });

  return mutation;
};
