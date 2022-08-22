import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CheckboxField from "components/forms/CheckboxField";
import Field from "components/forms/Field";
import Form from "components/forms/Form";
import Select from "components/forms/Select";
import SubmitButton from "components/forms/SubmitButton";
import { postTask, putTask } from "fetches/tasks";
import { FormikValues } from "formik";
import { TaskType } from "types/tasks";

interface TaskFormProps {
  task?: TaskType;
  open: boolean;
  handleClose: any;
}

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

export default function TaskForm({ task, open, handleClose }: TaskFormProps) {
  const edit = task?.id ? true : false;

  const initialValues = {
    name: task?.name ?? "",
    description: task?.description ?? "",
    responsable: task?.responsable ?? "",
    importance: task?.importance ?? "Low",
    marked: task?.marked ?? false,
  };

  const handleSubmit = async (values: FormikValues, { setStatus }: any) => {
    try {
      if (edit && task?.id) await putTask(task.id, values as TaskType);
      else await postTask(values as TaskType);
      setStatus({});
      handleClose();
    } catch (exception: any) {
      setStatus(exception.data);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {!edit ? "Create new task" : `Edit ${task?.name} task`}
      </DialogTitle>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <DialogContent>
          <Field label={"name"} name="name" id="name" placeholder={"name"} />
          <Field
            label={"description"}
            name="description"
            id="description"
            placeholder={"description"}
            multiline
            maxRows={15}
          />

          <Field
            label={"assigned to"}
            name="responsable"
            id="responsable"
            placeholder={"responsable"}
          />

          <Select
            label={"importance"}
            name="importance"
            id="importance"
            placeholder={"importance"}
            choices={importanceChoices}
          />

          <CheckboxField label={"Already done?"} name="marked" id="marked" />
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            className="gap-x-4"
            justifyContent="space-between"
          >
            <Button onClick={handleClose}>Cancel</Button>
            <SubmitButton>{!edit ? "Create" : "Edit"}</SubmitButton>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
