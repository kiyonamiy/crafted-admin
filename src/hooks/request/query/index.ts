import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import useRequest, { RequestOptions } from "../common";

type UseReqMutationOptions<R> = {
  queryKey: UseQueryOptions<R, string>["queryKey"];
} & Pick<RequestOptions, "url" | "method" | "header" | "payload"> &
  Omit<UseQueryOptions<R, string>, "queryFn" | "queryKey">;

const useReqQuery = <R>(options: UseReqMutationOptions<R>) => {
  const { url, method, header, payload, queryKey, ...queryOptions } = options;

  const request = useRequest();

  const query = useQuery({
    queryKey: [...queryKey, payload],
    queryFn: () => {
      return request<R>({
        url: url,
        method: method,
        header: header,
        payload,
      });
    },
    ...queryOptions,
  });
  return query;
};

export default useReqQuery;
