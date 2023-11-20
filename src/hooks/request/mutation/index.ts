import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import useRequest, { RequestOptions } from "../common";

type UseReqMutationOptions<P, R> = Pick<
  RequestOptions,
  "url" | "method" | "header"
> &
  Omit<UseMutationOptions<R, string, P, unknown>, "mutationFn">;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useReqMutation = <P extends Record<string, any>, R>(
  options: UseReqMutationOptions<P, R>,
) => {
  const { url, method, header, ...mutationOptions } = options;

  const request = useRequest();

  const mutation = useMutation({
    mutationFn: (payload: P) => {
      return request<R>({
        url: url,
        method: method,
        header: header,
        payload,
      });
    },
    ...mutationOptions,
  });
  return mutation;
};

export default useReqMutation;
