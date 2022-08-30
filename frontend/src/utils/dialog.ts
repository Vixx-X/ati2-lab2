import { ButtonProps, DialogProps } from "@mui/material";
import { _dialogStore } from "stores/DialogStore";

export const Dialog = (
  title: string,
  message?: string,
  buttons?: ButtonProps[],
  options?: DialogProps
) => {
  const dialogManager = _dialogStore.getState();
  dialogManager.addDialog(title, message, buttons, options);
};

export default Dialog;
