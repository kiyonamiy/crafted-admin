import "./index.less";

import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row } from "antd";
import React from "react";

import { useUserInfoQuery } from "@/hooks/query";
import { generateColorFromString } from "@/utils";

import { useHandleEditBtnClick } from "./hooks/handle-edit-btn-click";
import { useHandleEditPasswordBtnClick } from "./hooks/handle-edit-password-btn-click";

const LabelValue = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="label-value-container">
      <div className="label">{label}</div>
      <div>{value}</div>
    </div>
  );
};

function PersonalInformation() {
  const userInfoQuery = useUserInfoQuery();

  const handleEditBtnClick = useHandleEditBtnClick();
  const handleEditPasswordBtnClick = useHandleEditPasswordBtnClick();

  const labelvalues: { label: string; value: React.ReactNode }[] = [
    {
      label: "登录账号",
      value: userInfoQuery.data?.account,
    },
    {
      label: "账号密码",
      value: (
        <div className="value__password-container">
          ********
          <a onClick={() => void handleEditPasswordBtnClick()}>修改密码</a>
        </div>
      ),
    },
    {
      label: "加入时间",
      value: userInfoQuery.data?.createTime,
    },
    {
      label: "状态",
      value: "正常", // TODO 状态显示，请求枚举
    },
    {
      label: "角色信息",
      value: "超级管理员", // TODO 角色显示
    },
    {
      label: "手机号",
      value: userInfoQuery.data?.phoneNumber,
    },
  ];

  return (
    <div className="personal-information-container">
      <div className="info-block-1">
        {userInfoQuery.data && (
          <>
            <Avatar
              style={{
                backgroundColor: generateColorFromString(
                  userInfoQuery.data.name,
                ),
                verticalAlign: "middle",
              }}
              size={80}
            >
              {userInfoQuery.data.name.slice(0, 1)}
            </Avatar>
            <div className="name-block">{userInfoQuery.data.name}</div>
            <div className="institution-block">
              {userInfoQuery.data.institution}
            </div>
          </>
        )}
      </div>
      <div className="info-block-2">
        {userInfoQuery.data && (
          <>
            <div className="header">
              个人信息
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => void handleEditBtnClick(userInfoQuery.data)}
              >
                编辑
              </Button>
            </div>
            <div className="content">
              <Row gutter={[10, 30]}>
                {labelvalues.map(({ label, value }) => (
                  <Col key={label} span={6}>
                    <LabelValue label={label} value={value} />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalInformation;
