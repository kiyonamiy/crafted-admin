import { useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { MD5 } from "crypto-js";
import { useCallback } from "react";

import { QueryKeyEnum } from "@/hooks/query";

import { useEditPasswordModal } from "./edit-modal";
import { useUpdatePasswordMutation } from "./services";

export const useHandleEditPasswordBtnClick = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const openEditPasswordModal = useEditPasswordModal();
  const updatePasswordMutation = useUpdatePasswordMutation();

  const handleEditBtnClick = useCallback(() => {
    openEditPasswordModal({
      title: "修改密码",
      onConfirm: async (formResult) => {
        await updatePasswordMutation.mutateAsync({
          oldPassword: MD5(formResult.oldPassword).toString(),
          newPassword: MD5(formResult.newPassword).toString(),
        });
        void message.success("修改成功");
        void queryClient.resetQueries({
          queryKey: [QueryKeyEnum.USER_INFO],
        });
      },
    });
  }, [message, openEditPasswordModal, queryClient, updatePasswordMutation]);

  return handleEditBtnClick;
};
