import { App } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";

import { LocalKeyEnum } from "@/constants/local-key";
import { LoginResponseData, Response } from "@/types/base";
import { LocalStorageUtils } from "@/utils/local-storage";

export interface RequestOptions {
  url: string;
  method: "get" | "post" | "put" | "delete";
  payload?: Record<string, unknown>;
  header?: Record<string, unknown>;
}

/**
 * useRequest 是为 useReqMutation 和 useReqQuery 服务，请不要直接使用该 hooks。
 */
const useRequest = () => {
  const { message } = App.useApp();

  const request = useCallback(
    async <T>(options: RequestOptions): Promise<T> => {
      const { method, url, payload, header } = options;

      // 处理 data
      for (const key in payload) {
        if (payload[key] == null) {
          delete payload[key];
        }
      }

      // 获取 token
      const loginResult = LocalStorageUtils.getItem<LoginResponseData>(
        LocalKeyEnum.LOGIN_RESULT,
      );
      const token = loginResult?.token;
      // 发起请求
      return axios
        .request<Response<T>>({
          url,
          method,
          data: method !== "get" ? payload : undefined,
          params: method === "get" ? payload : undefined,
          headers: {
            Authorization: token,
            Accept: "application/json",
            ...header,
          },
        })
        .then((axiosResponse: AxiosResponse<Response<T>>) => {
          console.debug(
            `${new Date().toLocaleString("zh", {
              hour12: false,
            })}【${url}】：`,
            axiosResponse.data,
          );
          if (axiosResponse.data.code !== 0) {
            return Promise.reject(axiosResponse.data);
          }
          return axiosResponse.data.data;
        })
        .catch(async (error: Response<T> | AxiosError<Response<T>>) => {
          const DEFAULT_ERROR_MESSAGE = "请求发生错误，请联系管理员";
          let errorMessage = DEFAULT_ERROR_MESSAGE;
          if (error instanceof AxiosError) {
            if (error.response?.data.message != null) {
              errorMessage = error.response.data.message;
            }
          } else {
            // error is ResponseData<T>
            if (error.message != null) {
              errorMessage = error.message;
            }
          }
          void message.error({
            duration: 1.5,
            content: errorMessage,
          });
          // 未认证，跳转到登录页（此时一定是带了 token，但是过期了的）（未授权是 403，不做跳转）
          if (error instanceof AxiosError && error?.response?.status === 401) {
            // window.location.replace(RoutePathEnum.LOGIN.path);
          }
          return Promise.reject(errorMessage);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return request;
};

export default useRequest;
