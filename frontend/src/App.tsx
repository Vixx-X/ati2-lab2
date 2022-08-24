import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import LanguageSelect from "components/forms/LanguageSelect";
import TaskTable from "components/tasks/TaskTable";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TaskTable />
      <LanguageSelect />
    </LocalizationProvider>
  );
};

export default App;
