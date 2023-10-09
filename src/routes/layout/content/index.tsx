import { Layout as AntLayout, theme } from "antd";

import styles from "./index.module.less";

type ContentProps = React.HTMLAttributes<HTMLDivElement>;

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  const { children } = props;
  const {
    token: { padding },
  } = theme.useToken();

  return (
    <AntLayout.Content className={styles.content} style={{ padding }}>
      {children}
    </AntLayout.Content>
  );
};

export default Content;
