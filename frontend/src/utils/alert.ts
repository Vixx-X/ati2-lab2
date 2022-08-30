import { AlertColor } from "@mui/material/Alert";
import { _alertStore } from "stores/AlertStore";

export const Alert = (severity: AlertColor, text: string) => {
  const alertManager = _alertStore.getState();
  alertManager.addAlerts(severity, text);
};

export default Alert;
