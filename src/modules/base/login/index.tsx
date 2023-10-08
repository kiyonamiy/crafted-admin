import * as Icons from "@ant-design/icons";
import { createForm } from "@formily/core";
import { Field, FormProvider } from "@formily/react";
import { Card, Input, Tabs } from "antd";
import md5 from "crypto-js/md5";
import localforage from "localforage";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import FormItem from "@/components/form/form-item/index.tsx";
import FormLayout from "@/components/form/form-layout/index.tsx";
import Submit from "@/components/form/submit";
import { LocalKeyEnum } from "@/constants/local-key.ts";
import { LoginTypeEnum } from "@/constants/login-type.ts";
import * as BaseService from "@/services/base.ts";
import { LoginResult } from "@/types/base.ts";

import { VerifyCode } from "./components/verify-code.tsx";

function Login() {
  const navigate = useNavigate();

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

  const submit = useCallback(
    async (
      formData:
        | { username: string; password: string }
        | { phone: string; verifyCode: string },
    ) => {
      let loginResult: LoginResult | null | undefined;
      if ("username" in formData && "password" in formData) {
        loginResult = await BaseService.login({
          username: formData.username,
          password: md5(formData.password).toString(),
          loginType: LoginTypeEnum.NORMAL.code,
        });
      } else if ("phone" in formData && "verifyCode" in formData) {
        loginResult = await BaseService.login({
          phone: formData.phone,
          verifyCode: formData.verifyCode,
          loginType: LoginTypeEnum.PHONE.code,
        });
      }
      if (loginResult != null) {
        void localforage.setItem(LocalKeyEnum.LOGIN_RESULT, loginResult);
        navigate("/");
      }
    },
    [navigate],
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eee",
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: "visible", marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
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
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
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
                  name="verifyCode"
                  // title="验证码"
                  required
                  reactions={(field) => {
                    const phone = field.query(".phone");
                    field.setComponentProps({
                      readyPost: !!(phone.get("valid") && phone.get("value")),
                      phoneNumber: phone.get("value") as string,
                    });
                  }}
                  decorator={[FormItem]}
                  component={[
                    VerifyCode,
                    {
                      prefix: <Icons.LockOutlined />,
                      placeholder: "验证码",
                    },
                  ]}
                />
                <Submit block size="large" onSubmit={submit}>
                  登录
                </Submit>
              </FormLayout>
            </FormProvider>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  );
}
export default Login;
