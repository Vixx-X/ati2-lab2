import { ButtonProps, DialogProps } from "@mui/material";
import create from "zustand";
import _create from "zustand/vanilla";

const MAX_ID_LIMIT = 10000;

export interface Dialog {
  id: string;
  title: string;
  message?: string;
  buttons?: ButtonProps[];
  options?: DialogProps;
}

interface DialogStore {
  dialogs: Dialog[];
  addDialog: (
    title: string,
    message?: string,
    buttons?: ButtonProps[],
    options?: DialogProps
  ) => void;
  removeDialog: (id: string) => void;
}

export const _dialogStore = _create<DialogStore>()((set) => ({
  dialogs: [],
  removeDialog: (id: string) => {
    set((state) => ({
      dialogs: state.dialogs.filter((item) => item.id !== id),
    }));
  },
  addDialog: (
    title: string,
    message?: string,
    buttons?: ButtonProps[],
    options?: DialogProps
  ) => {
    const dialog = {
      id: Math.floor(Math.random() * MAX_ID_LIMIT).toString(),
      title: title,
      message: message,
      buttons: buttons,
      options: options,
    };
    set((state) => ({
      dialogs: [...state.dialogs, dialog],
    }));
  },
}));

export const dialogStore = create(_dialogStore);
export default dialogStore;
