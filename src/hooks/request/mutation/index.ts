import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import useRequest, { RequestOptions } from "../base";

type UseReqMutationOptions<P, R> = Pick<
  RequestOptions,
  "url" | "method" | "header"
> &
  Omit<UseMutationOptions<R, string, P, unknown>, "mutationFn">;

const useReqMutation = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends Record<string, any> | void = void,
  R = void,
>(
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
        payload: payload ?? undefined,
      });
    },
    ...mutationOptions,
  });
  return mutation;
};

export default useReqMutation;
