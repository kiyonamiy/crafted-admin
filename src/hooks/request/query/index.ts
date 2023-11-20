import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import useRequest, { RequestOptions } from "../base";

type UseReqMutationOptions<R> = {
  queryKey: UseQueryOptions<R, string>["queryKey"];
} & Pick<RequestOptions, "url" | "header" | "payload"> &
  Omit<UseQueryOptions<R, string>, "queryFn" | "queryKey">;

const useReqQuery = <R>(options: UseReqMutationOptions<R>) => {
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
