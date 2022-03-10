import Timer from "./modules/Timer";

import { useStyles } from "./styles";

function App() {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root)}>
      <Timer />
    </div>
  );
}

export default App;
