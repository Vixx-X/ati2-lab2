import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DateTimeField from "components/forms/Datetime";
import Form from "components/forms/Form";
import Select from "components/forms/Select";
import SubmitButton from "components/forms/SubmitButton";
import { FormikValues } from "formik";
import { TaskFilterType } from "types/tasks";

interface TaskFormProps {
  filter: TaskFilterType;
  setFilter: Function;
  open: boolean;
  handleClose: any;
}

const markedChoices = [
  {
    text: "None (Neither)",
    value: "none",
  },
  {
    text: "Not done",
    value: "false",
  },
  {
    text: "Already Done",
    value: "true",
  },
];

const importanceChoices = [
  {
    text: "Lower",
    value: "Low",
  },
  {
    text: "Middle",
    value: "Mid",
  },
  {
    text: "High",
    value: "High",
  },
];

export default function TaskFilter({
  filter,
  setFilter,
  open,
  handleClose,
}: TaskFormProps) {
  const initialValues = {
    importance: filter?.importance ?? [],
    marked: filter?.marked ?? "none",
    date_start: filter?.date_start ?? null,
    date_end: filter?.date_end ?? null,
  };

  const handleSubmit = async (values: FormikValues) => {
    const vals = { ...values };
    if (values.marked === "none") vals.marked = null;
    vals.date_start = values.date_start?.toISOString() ?? null;
    vals.date_end = values.date_end?.toISOString() ?? null;
    setFilter((prev: TaskFilterType) => ({ ...prev, ...vals }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Filters</DialogTitle>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <DialogContent>
          <Select
            label={"importance"}
            name="importance"
            id="importance"
            placeholder={"importance"}
            choices={importanceChoices}
            multiple
          />

          <Select
            label={"done"}
            name="marked"
            id="marked"
            placeholder={"marked"}
            choices={markedChoices}
          />

          <DateTimeField
            label={"start date"}
            name="date_start"
            id="date_start"
          />

          <DateTimeField label={"end date"} name="date_end" id="date_end" />
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            className="gap-x-4"
            justifyContent="space-between"
          >
            <Button onClick={handleClose}>Cancel</Button>
            <SubmitButton>Filter</SubmitButton>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
