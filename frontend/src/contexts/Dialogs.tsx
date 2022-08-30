import { Button, DialogContentText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dialogStore from "stores/DialogStore";

interface DialogProviderProps extends Props {}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const dialogs = dialogStore((state) => state.dialogs);
  const removeDialog = dialogStore((state) => state.removeDialog);

  return (
    <>
      {children}
      {dialogs.map((dialog) => (
        <Dialog
          key={dialog.id}
          open={true}
          onClose={() => removeDialog(dialog.id)}
          {...dialog?.options}
        >
          <DialogTitle>{dialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialog?.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {dialog?.buttons?.map((button: any, index: number) => (
              <Button
                key={index}
                {...button}
                onClick={() => {
                  button?.onClick?.();
                  removeDialog(dialog.id);
                }}
                children={button?.title ?? button?.children}
              />
            ))}
          </DialogActions>
        </Dialog>
      ))}
    </>
  );
};

export default DialogProvider;
