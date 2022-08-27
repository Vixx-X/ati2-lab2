import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import LanguageSelect from "components/forms/LanguageSelect";
import MainContainer from "components/layout/MainContainer";
import TaskTable from "components/tasks/TaskTable";
import alertStore from "stores/AlertStore";
import Alert from "@mui/material/Alert";
const App = () => {
  const alerts = alertStore((state)=>state.alerts)
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MainContainer>
        <TaskTable />
      </MainContainer>
      {
        alerts.map((alert)=>(
          <Alert severity={alert.severity} key={alert.id}>{alert.text}</Alert>
        ))
      }
    </LocalizationProvider>
  );
};

export default App;
