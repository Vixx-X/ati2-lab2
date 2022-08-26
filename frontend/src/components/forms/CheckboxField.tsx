import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormikContext } from "formik";
import recursiveGetter from "utils/recursiveGetter";

interface CheckboxFieldProps extends Props {
  placeholder?: string;
  name: string;
  label: string;
}

export const CheckboxField = ({
  placeholder,
  name,
  label,
  ...props
}: CheckboxFieldProps) => {
  const { values, setFieldValue } = useFormikContext();
  const vals: any = values;
  const handleChange = () => {
    setFieldValue(name, !recursiveGetter(vals, name));
  };

  return (
    <FormControlLabel
      className="w-full"
      label={label}
      control={
        <Checkbox
          checked={recursiveGetter(vals, name)}
          onClick={handleChange}
          inputProps={{
            "aria-label": "check",
          }}
          {...props}
        />
      }
      {...props}
    />
  );
};

export default CheckboxField;
