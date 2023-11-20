import * as Icons from "@ant-design/icons";
import { createForm } from "@formily/core";
import { Field, FormProvider } from "@formily/react";
import { Card, Input, Tabs } from "antd";
import { MD5 } from "crypto-js";
import { useCallback, useRef } from "react";

import FormItem from "@/components/form/form-item/index";
import FormLayout from "@/components/form/form-layout/index";
import Submit from "@/components/form/submit";
import { LocalKeyEnum } from "@/constants/local-key";
import { LoginResponseData } from "@/types/base";
import { LocalStorageUtils } from "@/utils/local-storage";

import { LoginTypeEnum } from "../../constants/login-type";
import { useLoginPageServices } from "../../hooks/services/page-login";

function Login() {
  const normalLoginFormRef = useRef(
    createForm({
      validateFirst: true,
    }),
  );

  const phoneLoginFormRef = useRef(
    createForm({
      validateFirst: true,
    }),
  );

  const { loginMutation } = useLoginPageServices();

  const submit = useCallback(
    async (
      formData:
        | { username: string; password: string }
        | { phone: string; password: string },
    ) => {
      let loginRespData: LoginResponseData | null | undefined;
      if ("username" in formData && "password" in formData) {
        loginRespData = await loginMutation.mutateAsync({
          account: formData.username,
          password: MD5(formData.password).toString(),
          loginType: LoginTypeEnum.NORMAL.code,
        });
      } else if ("phone" in formData && "password" in formData) {
        loginRespData = await loginMutation.mutateAsync({
          phoneNumber: formData.phone,
          password: MD5(formData.password).toString(),
          loginType: LoginTypeEnum.PHONE.code,
        });
      }
      if (loginRespData != null) {
        LocalStorageUtils.setItem(LocalKeyEnum.LOGIN_RESULT, loginRespData);
        // 缓存权限（具体权限交由各个 route 的 loader 进行判断）
        // const permissions = await BaseService.listAllPermission();
        // if (permissions != null) {
        //   LocalStorageUtils.setItem(LocalKeyEnum.PERMISSIONS, permissions);
        // }
        // 获取所有字典，并组合
        // const dictDataMap = await DictService.listAllDictData();
        // LocalStorageUtils.setItem(LocalKeyEnum.DICT_DATA_MAP, dictDataMap);
        // 跳转（不使用 navigate，仅仅是为了更方便的刷新 router，不是最优解）TODO
        // window.location.replace(RoutePathEnum.PERSONAL_INFORMATION.path);
      }
    },
    [loginMutation],
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eeeeee",
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs
          style={{ overflow: "visible", marginTop: -10 }}
          items={[
            {
              key: "normal",
              label: "账密登录",
              children: (
                <FormProvider form={normalLoginFormRef.current}>
                  <FormLayout layout="vertical" size="large">
                    <Field
                      name="username"
                      // title="用户名"
                      required
                      decorator={[FormItem]}
                      component={[
                        Input,
                        {
                          prefix: <Icons.UserOutlined />,
                          placeholder: "用户名",
                        },
                      ]}
                    />
                    <Field
                      name="password"
                      // title="密码"
                      required
                      decorator={[FormItem]}
                      component={[
                        Input.Password,
                        {
                          prefix: <Icons.LockOutlined />,
                          placeholder: "密码",
                        },
                      ]}
                    />
                    <Submit block size="large" onSubmit={submit}>
                      登录
                    </Submit>
                  </FormLayout>
                </FormProvider>
              ),
            },
            {
              key: "phone",
              label: "手机登录",
              children: (
                <FormProvider form={phoneLoginFormRef.current}>
                  <FormLayout layout="vertical" size="large">
                    <Field
                      name="phone"
                      // title="手机号"
                      required
                      validator="phone"
                      decorator={[FormItem]}
                      component={[
                        Input,
                        {
                          prefix: <Icons.PhoneOutlined />,
                          placeholder: "手机号",
                        },
                      ]}
                    />
                    <Field
                      name="password"
                      // title="密码"
                      required
                      decorator={[FormItem]}
                      component={[
                        Input.Password,
                        {
                          prefix: <Icons.LockOutlined />,
                          placeholder: "密码",
                        },
                      ]}
                    />
                    <Submit block size="large" onSubmit={submit}>
                      登录
                    </Submit>
                  </FormLayout>
                </FormProvider>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
export default Login;
