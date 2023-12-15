import "./index.less";

import { Button, Card, Form, Input, Tabs } from "antd";
import { MD5 } from "crypto-js";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RouteObjectEnum } from "@/constants/route-object";
import { LocalStorageUtils } from "@/utils/local-storage";

import { LoginTypeEnum } from "../../constants/login-type";
import { useServices } from "./hooks/services";

interface FormValue {
  phoneNumber: string;
  password: string;
}

function Login() {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const { loginMutation, listAllPermissionMutation } = useServices();

  // const handleFinish = (values: FormValue) => {
  //   console.log("Success:", values);
  // };

  const handleFinish = useCallback(
    (formData: FormValue) => {
      setLoginLoading(true);
      void loginMutation
        .mutateAsync({
          phoneNumber: formData.phoneNumber,
          password: MD5(formData.password).toString(),
          loginType: LoginTypeEnum.PHONE.code,
        })
        .then(async (loginRespData) => {
          if (loginRespData != null) {
            LocalStorageUtils.setItem(LocalKeyEnum.LOGIN_RESULT, loginRespData);
            // 缓存权限（具体权限交由各个 route 的 loader 进行判断）
            const permissions = await listAllPermissionMutation.mutateAsync();
            if (permissions != null) {
              LocalStorageUtils.setItem(LocalKeyEnum.PERMISSIONS, permissions);
            }
            // 获取所有字典，并组合
            // const dictDataMap = await DictService.listAllDictData();
            // LocalStorageUtils.setItem(LocalKeyEnum.DICT_DATA_MAP, dictDataMap);
            // 跳转（不使用 navigate，仅仅是为了更方便的刷新 router，不是最优解）TODO
            navigate(RouteObjectEnum.PERSONAL_INFORMATION.path);
            if (loginRespData != null) {
              LocalStorageUtils.setItem(
                LocalKeyEnum.LOGIN_RESULT,
                loginRespData,
              );
              // 缓存权限（具体权限交由各个 route 的 loader 进行判断）
              const permissions = await listAllPermissionMutation.mutateAsync();
              if (permissions != null) {
                LocalStorageUtils.setItem(
                  LocalKeyEnum.PERMISSIONS,
                  permissions,
                );
              }
              // 获取所有字典，并组合
              // const dictDataMap = await DictService.listAllDictData();
              // LocalStorageUtils.setItem(LocalKeyEnum.DICT_DATA_MAP, dictDataMap);
              // 跳转（不使用 navigate，仅仅是为了更方便的刷新 router，不是最优解）TODO
              navigate(RouteObjectEnum.PERSONAL_INFORMATION.path);
            }
          }
        })
        .finally(() => {
          setLoginLoading(false);
        });
    },
    [listAllPermissionMutation, loginMutation, navigate],
  );

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <Tabs
          className="tabs"
          items={[
            {
              key: "phone",
              label: "手机登录",
              children: (
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={handleFinish}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item<Pick<FormValue, "phoneNumber">>
                    label="phone"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<Pick<FormValue, "password">>
                    label="password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loginLoading}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
export default Login;
