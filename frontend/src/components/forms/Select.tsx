import { FormControl, InputLabel, MenuItem } from "@mui/material";
import SSelect from "@mui/material/Select";
import { useFormikContext } from "formik";
import useTranslate from "hooks/useTranslate";
import recursiveGetter from "utils/recursiveGetter";

interface SelectProps extends Props {
  choices: { value: string; text: any }[];
  noPlaceholder?: boolean;
  placeholder?: string;
  name: string;
}

export const Select = ({
  choices,
  placeholder,
  noPlaceholder,
  name,
  ...props
}: SelectProps) => {
  const { values, setFieldValue } = useFormikContext();
  const vals: any = values;
  const handleChange = (e: any) => {
    const value = e.target.value;
    setFieldValue(name, value);
  };

  const t = useTranslate();

  return (
    <FormControl className="w-full">
      {!noPlaceholder && <InputLabel>{placeholder ?? t("select")}</InputLabel>}
      <SSelect
        value={recursiveGetter(vals, name)}
        onChange={handleChange}
        {...props}
        label={placeholder}
        sx={{
          ...props.sx,
          display: "flex",
        }}
      >
        {choices?.map(({ text, value }) => {
          return (
            <MenuItem value={value} key={value}>
              <>{text}</>
            </MenuItem>
          );
        })}
      </SSelect>
    </FormControl>
  );
};

export default Select;
