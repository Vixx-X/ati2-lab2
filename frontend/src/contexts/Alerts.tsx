import Alert from "@mui/material/Alert";
import alertStore from "stores/AlertStore";

interface AlertProviderProps extends Props {}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const alerts = alertStore((state) => state.alerts);

  return (
    <>
      {children}
      <div
        id="AlertContainer"
        className="flex flex-col gap-3 m-4 fixed bottom-0 right-0"
      >
        {alerts.map((alert) => (
          <Alert
            severity={alert.severity}
            key={alert.id}
            className="shadow-md"
            sx={{
              boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
            }}
          >
            {alert.text}
          </Alert>
        ))}
      </div>
    </>
  );
};

export default AlertProvider;
