import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TaskTable from "components/tasks/TaskTable";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TaskTable />
    </LocalizationProvider>
  );
};

export default App;
