import classnames from "classnames";

import styles from "./App.module.less";

function App() {
  return (
    <div className={styles.container}>
      <span className={classnames(styles.text)}>Hello World</span>
    </div>
  );
}

export default App;
