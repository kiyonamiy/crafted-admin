import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

import { RouteObjectEnum } from "@/constants/route-object";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="不好意思，你所访问的页面不存在。"
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
export default PageNotFound;
