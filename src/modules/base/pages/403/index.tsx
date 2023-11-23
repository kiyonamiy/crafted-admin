import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

import { RouteObjectEnum } from "@/constants/route-object";

function PageForbidden() {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="不好意思，你没有权限访问该页面。"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(RouteObjectEnum.PERSONAL_INFORMATION.path);
          }}
        >
          返回个人主页
        </Button>
      }
    />
  );
}
export default PageForbidden;
