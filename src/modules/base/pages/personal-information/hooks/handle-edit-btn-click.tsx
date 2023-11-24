import { useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useCallback } from "react";

import { QueryKeyEnum } from "@/hooks/query";
import { UserInfo } from "@/types/base";

import { useEditPersonalInfoModal } from "./edit-modal";
import { useUpdateUserInfoMutation } from "./services";

export const useHandleEditBtnClick = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const openPersonalInfoEditModal = useEditPersonalInfoModal();
  const updateUserInfoMutation = useUpdateUserInfoMutation();

  const handleEditBtnClick = useCallback(
    (record: UserInfo) => {
      openPersonalInfoEditModal({
        title: "编辑个人信息",
        initialData: record,
        onConfirm: async (formResult) => {
          await updateUserInfoMutation.mutateAsync(formResult);
          void message.success("编辑成功");
          void queryClient.resetQueries({
            queryKey: [QueryKeyEnum.USER_INFO],
          });
        },
      });
    },
    [message, openPersonalInfoEditModal, queryClient, updateUserInfoMutation],
  );

  return handleEditBtnClick;
};
