import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import useRequest, { RequestOptions } from "../base";

type UseReqQueryOptions<R> = Pick<
  RequestOptions,
  "url" | "header" | "payload"
> &
  Omit<UseQueryOptions<R, string>, "queryFn">;

const useReqQuery = <R>(options: UseReqQueryOptions<R>) => {
  const { url, header, payload, queryKey, ...queryOptions } = options;

  const request = useRequest();

  const query = useQuery({
    queryKey: [...queryKey, payload],
    queryFn: () => {
      return request<R>({
        url: url,
        method: "get",
        header: header,
        payload,
      });
    },
    ...queryOptions,
  });
  return query;
};

export default useReqQuery;
