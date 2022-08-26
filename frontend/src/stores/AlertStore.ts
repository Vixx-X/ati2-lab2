import { AlertColor } from "@mui/material/Alert";
import create from "zustand";
import _create from "zustand/vanilla";

const DELETE_TIME_ALERT = 5000;
const MAX_ID_LIMIT = 10000

interface Alert {
  id: string;
  severity: AlertColor;
  text: string;
}

interface AlertStore {
  alerts: Alert[];
  addAlerts: (severity: AlertColor, text: string) => void;
  removeAlert: (id: string) => void;
}

export const _alertStore = _create<AlertStore>()((set, get) => ({
  alerts: [],
  removeAlert: (id:string) => {
    set((state)=>({
        alerts:state.alerts.filter((item)=>(item.id !== id))
    }))
  },
  addAlerts: (severity: AlertColor, text: string) => {
    const alert = {
      id: Math.floor(Math.random() * MAX_ID_LIMIT).toString(),
      severity: severity,
      text: text,
    };
    set((state) => ({
      alerts: [
        ...state.alerts,
        alert
      ],
    }));
    setTimeout(()=>{
        get().removeAlert(alert.id)
    },DELETE_TIME_ALERT)
  },
}));

export const alertStore = create(_alertStore);
export default alertStore;
