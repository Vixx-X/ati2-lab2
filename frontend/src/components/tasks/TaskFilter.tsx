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
import useTranslate from "hooks/useTranslate";
import { TaskFilterType } from "types/tasks";

interface TaskFormProps {
  filter: TaskFilterType;
  setFilter: Function;
  open: boolean;
  handleClose: any;
}
export default function TaskFilter({
  filter,
  setFilter,
  open,
  handleClose,
}: TaskFormProps) {
  const t = useTranslate();

  const markedChoices = [
    {
      text: t("none (neither)"),
      value: "none",
    },
    {
      text: t("not done"),
      value: "false",
    },
    {
      text: t("already done"),
      value: "true",
    },
  ];

  const importanceChoices = [
    {
      text: t("lower"),
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
            label={t("importance")}
            name="importance"
            id="importance"
            placeholder={t("importance")}
            choices={importanceChoices}
            multiple
          />

          <Select
            label={t("done")}
            name="marked"
            id="marked"
            placeholder={t("marked")}
            choices={markedChoices}
          />

          <DateTimeField
            label={t("start date")}
            name="date_start"
            id="date_start"
          />

          <DateTimeField label={t("end date")} name="date_end" id="date_end" />
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            className="gap-x-4"
            justifyContent="space-between"
          >
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <SubmitButton>{t("filter")}</SubmitButton>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
