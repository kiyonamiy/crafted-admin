import useReqMutation from "@/hooks/request/mutation";

export const useServices = () => {
  const logoutMutation = useReqMutation<void, void>({
    url: "/ca/userLogout",
    method: "post",
  });

  return {
    logoutMutation,
  };
};
