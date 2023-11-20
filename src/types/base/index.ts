export interface LoginResponseData {
  id: string;
  /**
   * 用户姓名
   */
  account: string;
  token: string;
}

export interface Response<T> {
  code: number;
  data: T;
  message?: string;
}

export interface PageData<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

export interface PageParams {
  pageNo: number; // 页码，默认1
  pageSize: number; // 每页数量，默认20
}
