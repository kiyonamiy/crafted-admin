import { Breadcrumb as AntdBreadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

import { RouteKeyEnum, RouteObjectEnum } from "@/constants/route-object";
import { useRouteFullPath } from "@/hooks/route";

const Breadcrumb = () => {
  const { key, parentKeys = [] } = useRouteFullPath();

  const navigate = useNavigate();

  return (
    <AntdBreadcrumb
      className="layout__breadcrumb"
      items={[...parentKeys, key]?.map((key: RouteKeyEnum) => ({
        title: RouteObjectEnum[key].description,
        onClick: () => {
          navigate(RouteObjectEnum[key].path);
        },
      }))}
    />
  );
};

export default Breadcrumb;
