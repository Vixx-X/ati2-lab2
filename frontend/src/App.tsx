import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import MainContainer from "components/layout/MainContainer";
import TaskTable from "components/tasks/TaskTable";
import AlertProvider from "contexts/Alerts";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AlertProvider>
        <MainContainer>
          <TaskTable />
        </MainContainer>
      </AlertProvider>
    </LocalizationProvider>
  );
};

export default App;
