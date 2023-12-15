import { useCallback } from "react";

export const useHandleEditPasswordBtnClick = () => {
  // const { message } = App.useApp();
  // const queryClient = useQueryClient();

  // const updatePasswordMutation = useUpdatePasswordMutation();

  const handleEditBtnClick = useCallback(() => {
    // openEditPasswordModal({
    //   title: "修改密码",
    //   onConfirm: async (formResult) => {
    //     await updatePasswordMutation.mutateAsync({
    //       oldPassword: MD5(formResult.oldPassword).toString(),
    //       newPassword: MD5(formResult.newPassword).toString(),
    //     });
    //     void message.success("修改成功");
    //     void queryClient.resetQueries({
    //       queryKey: [QueryKeyEnum.USER_INFO],
    //     });
    //   },
    // });
  }, []);

  return handleEditBtnClick;
};
