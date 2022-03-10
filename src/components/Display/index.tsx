import { FC } from "react";

import { useDisplayStyles } from "./styles";

interface Props {
  isTimeUp: boolean;
  remainingTime: {
    hours: string;
    minutes: string;
    seconds: string;
  };
}

const Display: FC<Props> = ({ isTimeUp, remainingTime }) => {
  const { classes, cx } = useDisplayStyles();

  return (
    <div className={cx(classes.display)}>
      {isTimeUp ? (
        <>Time Up!</>
      ) : (
        <>
          {remainingTime.hours} : {remainingTime.minutes} :{" "}
          {remainingTime.seconds}
        </>
      )}
    </div>
  );
};

export default Display;
