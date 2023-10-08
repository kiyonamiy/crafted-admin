import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface RequestOptions {
  url: string;
  method?: "get" | "post" | "put" | "delete";
  data?: Record<string, unknown>;
  query?: Record<string, string>; // 用于 url 拼接
  header?: Record<string, unknown>;
}

export interface ResponseData<T> {
  code: number;
  data: T | null;
  message?: string;
}

const request = async <T>(options: RequestOptions): Promise<T | null> => {
  const { method = "get", url, data, query, header } = options;

  let processedUrl = url;

  // 构造 query
  if (query) {
    processedUrl += "?";
    processedUrl += Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  // 处理 data
  for (const key in data) {
    if (data[key] == null) {
      delete data[key];
    }
  }

  return axios
    .request<ResponseData<T>>({
      url: processedUrl,
      method,
      data,
      headers: {
        // Authorization: Taro.getStorageSync("token"), // TODO
        "Content-Type": "application/json",
        Accept: "application/json",
        ...header,
      },
    })
    .then((axiosResponse: AxiosResponse<ResponseData<T>>) => {
      console.debug(
        `${new Date().toLocaleString("zh", {
          hour12: false,
        })}【${processedUrl}】：`,
        axiosResponse.data,
      );
      if (axiosResponse.data.code !== 0) {
        return Promise.reject(axiosResponse.data);
      }
      return axiosResponse.data.data;
    })
    .catch((error: ResponseData<T> | AxiosError) => {
      const errorMessage = error.message;
      // 未认证，跳转到登录页（此时一定是带了 token，但是过期了的）（未授权是 403，不做跳转）
      if (error instanceof AxiosError && error?.response?.status === 404) {
        // TODO history.replace("/login");
        // TODO 部分页面不需要做跳转
      }
      void message.error(errorMessage);
      return Promise.reject(errorMessage);
    });
};

export default request;
