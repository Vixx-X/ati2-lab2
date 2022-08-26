import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import LanguageSelect from "components/forms/LanguageSelect";
import MainContainer from "components/layout/MainContainer";
import TaskTable from "components/tasks/TaskTable";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MainContainer>
        <TaskTable />
      </MainContainer>
    </LocalizationProvider>
  );
};

export default App;
