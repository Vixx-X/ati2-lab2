import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import MainContainer from "components/layout/MainContainer";
import TaskTable from "components/tasks/TaskTable";
import AlertProvider from "contexts/Alerts";
import DialogProvider from "contexts/Dialogs";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AlertProvider>
        <DialogProvider>
          <MainContainer>
            <TaskTable />
          </MainContainer>
        </DialogProvider>
      </AlertProvider>
    </LocalizationProvider>
  );
};

export default App;
