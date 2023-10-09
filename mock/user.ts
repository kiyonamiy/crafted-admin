export default [
  {
    url: "/user/getUserInfo",
    method: "get",
    timeout: 1000,
    response: ({ body, query }) => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          id: 1,
          userName: "admin",
          nickName: "kiyonami",
          status: 0,
          avatar:
            "http://enerrun.oss-cn-hangzhou.aliyuncs.com/168671077087755199255?OSSAccessKeyId=LTAI5tKNmCCVh8gts5nUBrsm&Expires=2002070771&Signature=ENyOHt5XxdF4Fu7EHIz7Z9m%2F2uk%3D",
          deptId: 1,
          deptName: "系统默认机构",
          roleList: [
            {
              roleId: 1,
              roleCode: "admin",
              roleName: "超级管理员",
              roleNameAbbr: "超管",
            },
            {
              roleId: 6,
              roleCode: "SE162376",
              roleName:
                "这是五十字很长名字的很长名字的很长名字的很长1字的很长名字的很长名字的很长名字的很长名字的很长名字的",
            },
          ],
          createTime: "2023-06-05 11:53:07",
          everSetPassword: true,
        },
      };
    },
  },
  {
    url: "/user/getRoleList",
    method: "get",
    timeout: 1000,
    response: ({ body, query }) => {
      return {
        code: 401,
        message: "认证失败",
      };
    },
    statusCode: 401,
  },
];
