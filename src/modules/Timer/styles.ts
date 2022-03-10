import { makeStyles } from "tss-react/mui";

export const useTimerStyles = makeStyles()(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  input: {
    width: "500px",
    color: "white",
  },
}));
