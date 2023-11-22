import classnames from "classnames";

import { useSiderContext } from "../sider";

const Logo = () => {
  const { collapsed } = useSiderContext();

  return (
    <div
      className={classnames({
        layout__logo: true,
        "layout__logo--collapsed": collapsed,
      })}
    >
      <img src="/logo.jpeg" />
      <p>crafted admin</p>
    </div>
  );
};

export default Logo;
