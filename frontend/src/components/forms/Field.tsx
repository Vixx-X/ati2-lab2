import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useMemo } from "react";
import recursiveGetter from "utils/recursiveGetter";

const defaultOnChange = (callback: Function) => {
  return callback;
};

export const Field = ({
  children,
  onChangeCallback,
  name,
  ...props
}: Props) => {
  if (!onChangeCallback) onChangeCallback = defaultOnChange;

  const { values, setFieldValue, status } = useFormikContext();
  const vals: any = values;

  const handleChange = (e: any) => {
    const value = e.target.value;
    setFieldValue(name, value);
  };

  const hasError = useMemo(
    () => recursiveGetter(status, name, null) /* || errors?.[props.name]*/,
    [status, props.name /*, errors*/]
  );

  const errorMessage = useMemo(() => {
    return recursiveGetter(status, name, null);
  }, [status, name]);

  return (
    <TextField
      onChange={onChangeCallback(handleChange)}
      value={recursiveGetter(vals, name)}
      error={hasError}
      className="w-full"
      helperText={hasError && errorMessage}
      {...props}
    >
      {children}
    </TextField>
  );
};

export default Field;
