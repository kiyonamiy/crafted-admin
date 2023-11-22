import classnames from "classnames";
import { createContext, useContext, useState } from "react";

const SiderContext = createContext<{
  collapsed: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  collapsed: false,
  setCollapsed: undefined,
});

const Sider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <SiderContext.Provider value={{ collapsed, setCollapsed }}>
      <div
        className={classnames({
          layout__sider: true,
          "layout__sider--collapsed": collapsed,
        })}
      >
        {children}
      </div>
    </SiderContext.Provider>
  );
};

export default Sider;

// 这样的引用方式，也是没有造成循环引用的，可以接受
// eslint-disable-next-line react-refresh/only-export-components
export const useSiderContext = () => {
  return useContext(SiderContext);
};
