import { Field } from "@formily/core";
import { Input } from "antd";
import Password from "antd/es/input/Password";
import { useMemo } from "react";

import { useFormModal } from "@/hooks/form-modal";
import { UserInfo } from "@/types/base";

// 修改密码弹窗
export const useEditPasswordModal = () => {
  const items = useMemo(
    () => [
      {
        required: true,
        title: "原密码",
        name: "oldPassword",
        validator: {
          max: 16,
        },
        component: [
          Password,
          {
            placeholder: "请输入",
          },
        ],
      },
      {
        required: true,
        title: "新密码",
        name: "newPassword",
        validator: {
          max: 16,
        },
        component: [
          Password,
          {
            placeholder: "请输入",
          },
        ],
      },
      {
        required: true,
        title: "确认密码",
        name: "confirmPassword",
        validator: {
          max: 16,
        },
        component: [
          Password,
          {
            placeholder: "请输入",
          },
        ],
        reactions: (field: Field) => {
          const newPasswordQuery = field.query(".newPassword");
          field.selfErrors =
            newPasswordQuery.get("value") &&
            field.value &&
            field.value != newPasswordQuery.get("value")
              ? ["两次密码不一致"]
              : [];
        },
      },
    ],
    [],
  );

  const openModal = useFormModal<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    items,
  });

  return openModal;
};

// 编辑个人信息弹窗
export const useEditPersonalInfoModal = () => {
  const items = useMemo(
    () => [
      {
        name: "id",
        display: "hidden",
      },
      {
        required: true,
        name: "name",
        title: "真实姓名",
        component: [
          Input,
          {
            placeholder: "请输入",
          },
        ],
      },
      {
        required: true,
        name: "account",
        title: "账号",
        component: [
          Input,
          {
            placeholder: "请输入",
          },
        ],
        validator: {
          pattern: /^[a-zA-Z0-9]{5,20}$/,
          message: "只能包含英文和数字，且不能少于5位，不能超过20位",
        },
        reactions: (field: Field) => {
          const idQuery = field.query(".id");
          // 说明是编辑，编辑无法修改账号
          if (idQuery.get("value") != null) {
            field.disabled = true;
          }
        },
      },
      {
        required: true,
        name: "phoneNumber",
        title: "手机号",
        validator: "phone",
        component: [
          Input,
          {
            placeholder: "请输入",
          },
        ],
      },
    ],
    [],
  );

  const openModal = useFormModal<UserInfo>({
    items,
  });

  return openModal;
};
