import { LocalKeyEnum } from "@/constants/local-key";

const store: Record<LocalKeyEnum, unknown> = {
  [LocalKeyEnum.LOGIN_RESULT]: undefined,
  [LocalKeyEnum.PERMISSIONS]: undefined,
  [LocalKeyEnum.DICT_DATA_MAP]: undefined,
};

/**
 * 相较于 localStorage，具有“类型提示”、“对象缓存”的能力（不从 localStorage 读取，而是内存读取；getItem 返回 JSON 解析后的结果，而不是 string）。
 * 相较于 localForage，是同步存取，而不是异步。
 * 未测试大量数据存储情况，并且不建议存储大量数据。
 */
export const LocalStorageUtils = {
  setItem: (key: LocalKeyEnum, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
    store[key] = value;
  },
  getItem: <T>(key: LocalKeyEnum, defaultValue?: T): typeof defaultValue => {
    if (store[key] != null) {
      return store[key] as T;
    }
    try {
      const valueString = localStorage.getItem(key);
      if (valueString != null) {
        const value = JSON.parse(valueString) as T;
        store[key] = value; // 缓存
        return value;
      }
      return defaultValue;
    } catch (e: unknown) {
      return defaultValue;
    }
  },
  removeItem: (key: LocalKeyEnum) => {
    localStorage.removeItem(key);
    store[key] = undefined;
  },
  clear: () => {
    localStorage.clear();
    Object.keys(store).forEach((key) => {
      store[key as LocalKeyEnum] = undefined;
    });
  },
};
