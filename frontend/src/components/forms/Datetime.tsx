import Field from "./Field";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFormikContext } from "formik";
import recursiveGetter from "utils/recursiveGetter";

export const DateTimeField = ({ name, ...props }: Props) => {
  const { values, setFieldValue } = useFormikContext();
  const vals: any = values;
  const handleChange = (value: any) => {
    setFieldValue(name, value);
  };
  return (
    <DateTimePicker
      value={recursiveGetter(vals, name)}
      onChange={handleChange}
      renderInput={(props: any) => <Field name={name} {...props} />}
      {...props}
    />
  );
};

export default DateTimeField;
