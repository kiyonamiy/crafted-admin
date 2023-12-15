import { useCallback } from "react";

import { UserInfo } from "@/types/base";

export const useHandleEditBtnClick = () => {
  // const { message } = App.useApp();
  // const queryClient = useQueryClient();

  // const updateUserInfoMutation = useUpdateUserInfoMutation();

  const handleEditBtnClick = useCallback((record: UserInfo) => {
    // TODO
    console.log(record);
  }, []);

  return handleEditBtnClick;
};
