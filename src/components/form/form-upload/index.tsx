import "./index.less";

import { PlusOutlined } from "@ant-design/icons";
import { App, Button, ButtonProps, Upload, UploadProps } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

import { LocalKeyEnum } from "@/constants/local-key";
import { LoginResponseData } from "@/types/base";
import { LocalStorageUtils } from "@/utils/local-storage";

const isLimitSize = (files: RcFile, size = 100) => {
  const isMac = () => {
    if (/macintosh|mac os x/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  };

  if (isMac()) {
    return files.size / 1000 / 1000 < size;
  }
  return files.size / 1024 / 1024 < size;
};

export type FormUploadProps = Omit<UploadProps, "fileList" | "onChange"> & {
  maxFileSize: number; // 单位是 MB，必传，防止单个文件过大
  value: Omit<UploadChangeParam<UploadFile<unknown>>, "file">;
  accept?: string;
  onChange: (v: Omit<UploadChangeParam<UploadFile<unknown>>, "file">) => void;
};

export const FormUpload = (props: React.PropsWithChildren<FormUploadProps>) => {
  const {
    action,
    maxFileSize,
    maxCount,
    children,
    value,
    accept,
    onChange,
    ...restProps
  } = props;

  const { message } = App.useApp();

  const beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    if (maxFileSize != null && !isLimitSize(file, maxFileSize)) {
      void message.error(`文件大小不能超过 ${maxFileSize}M`);
      return Upload.LIST_IGNORE;
    }
    if (maxCount != null && fileList.length > maxCount) {
      void message.error(`文件数量不能超过 ${maxCount} 个`);
      return Upload.LIST_IGNORE;
    }
    if (action == null) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Upload
        action={action}
        maxCount={maxCount}
        headers={{
          Authorization:
            LocalStorageUtils.getItem<LoginResponseData>(
              LocalKeyEnum.LOGIN_RESULT,
            )?.token ?? "",
        }}
        beforeUpload={beforeUpload}
        fileList={value?.fileList}
        onChange={onChange}
        accept={accept}
        {...restProps}
      >
        {/* 超过最大限制，则隐藏“上传按钮”（不展示） */}
        {value == null || maxCount == null || value.fileList.length < maxCount
          ? children
          : null}
      </Upload>
      {accept ? (
        <span className="upload-description">支持格式：{accept}</span>
      ) : (
        <></>
      )}
    </>
  );
};

export const UploadButton: React.FC = (props: ButtonProps) => {
  const { children } = props;
  return (
    <Button {...props}>
      {children ?? (
        <div className="upload-button-content">
          <PlusOutlined />
          上传文件
        </div>
      )}
    </Button>
  );
};

export const ImageUploadButton: React.FC = () => {
  return (
    <div className="image=upload-button-content">
      <PlusOutlined />
      <div>上传图片</div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const uploadValidator = (
  value: UploadChangeParam<UploadFile<{ data: string }>>,
  rule: { required?: boolean },
) => {
  if (!value || (rule.required && value.fileList.length === 0)) {
    return {
      type: "error",
      message: "请上传文件",
    };
  }
  if (value.fileList.some(({ status }) => status === "error")) {
    return {
      type: "error",
      message: "上传错误，请重新上传",
    };
  }
  return true;
};

export default FormUpload;
