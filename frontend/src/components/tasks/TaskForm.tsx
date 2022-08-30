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
import useTranslate from "hooks/useTranslate";
import { TaskType } from "types/tasks";

interface TaskFormProps {
  task?: TaskType;
  open: boolean;
  handleClose: any;
}

export default function TaskForm({ task, open, handleClose }: TaskFormProps) {
  const t = useTranslate();
  const importanceChoices = [
    {
      text: t("low"),
      value: "Low",
    },
    {
      text: t("middle"),
      value: "Mid",
    },
    {
      text: t("high"),
      value: "High",
    },
  ];

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
  const styles = {
    '& .MuiPaper-root': {
      minWidth: "fit-content",
      width: "90%",
      maxWidth: "40rem",
    },
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={styles}>
      <DialogTitle>
        {!edit ? t("create new task") : t("edit {0} task", task?.name)}
      </DialogTitle>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <DialogContent className="flex flex-col gap-y-4 w-full">
          <Field
            label={t("name")}
            name="name"
            id="name"
            placeholder={t("name")}
          />

          <Field
            label={t("description")}
            name={"description"}
            id="description"
            placeholder={t("description")}
            multiline
            maxRows={15}
          />

          <Field
            label={t("assigned to")}
            name="responsable"
            id="responsable"
            placeholder={t("place assigned person email")}
          />

          <Select
            label={t("importance")}
            name="importance"
            id="importance"
            placeholder={t("importance")}
            choices={importanceChoices}
          />

          <CheckboxField label={t("already done?")} name="marked" id="marked" />
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            className="gap-x-4"
            justifyContent="space-between"
          >
            <Button onClick={handleClose}>Cancel</Button>
            <SubmitButton>{!edit ? t("create") : t("edit")}</SubmitButton>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
