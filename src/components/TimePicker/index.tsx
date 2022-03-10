import React, { FC } from "react";
import { TextField, Stack } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TimePicker as MUITimePicker, LocalizationProvider } from "@mui/lab";
import { useTimePickerStyles } from "./styles";

interface Props {
  countdownDate: Date | null;
  setCountdownDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setRemainingTime: React.Dispatch<
    React.SetStateAction<{
      hours: string;
      minutes: string;
      seconds: string;
    }>
  >;
}

const TimePicker: FC<Props> = ({
  countdownDate,
  setCountdownDate,
  setRemainingTime,
}) => {
  const { classes, cx } = useTimePickerStyles();

  const onTimeChange = (newValue: any) => {
    if (newValue) {
      const hours = newValue.getHours();
      const minutes = newValue.getMinutes();
      const seconds = newValue.getSeconds();

      setCountdownDate(newValue);

      setRemainingTime(() => {
        return {
          hours: hours ? String(hours > 9 ? hours : "0" + hours) : "00",
          minutes: minutes
            ? String(minutes > 9 ? minutes : "0" + minutes)
            : "00",
          seconds: seconds
            ? String(seconds > 9 ? seconds : "0" + seconds)
            : "00",
        };
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MUITimePicker
          ampm={false}
          openTo="hours"
          views={["hours", "minutes", "seconds"]}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          label="Select Time"
          value={countdownDate}
          onChange={onTimeChange}
          renderInput={(params) => (
            <TextField className={cx(classes.input)} autoFocus {...params} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default TimePicker;
