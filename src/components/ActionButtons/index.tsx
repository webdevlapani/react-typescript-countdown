import { FC } from "react";
import { Button } from "@mui/material";

import { useActionButtonsStyles } from "./styles";

interface Props {
  isRunning: boolean | undefined;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  countdownDate: Date | null;
}

const ActionButtons: FC<Props> = ({
  countdownDate,
  isRunning,
  onStart,
  onStop,
  onReset,
}) => {
  const { classes, cx } = useActionButtonsStyles();

  return (
    <div className={cx(classes.container)}>
      <Button
        disabled={!countdownDate}
        variant="outlined"
        onClick={!isRunning ? onStart : onStop}
      >
        {!isRunning ? "Start" : "Stop"}
      </Button>
      <Button disabled={!countdownDate} variant="outlined" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

export default ActionButtons;
