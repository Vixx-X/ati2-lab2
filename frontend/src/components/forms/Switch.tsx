import { Field } from "./Field";
import { Switch as HUISwitch } from "@headlessui/react";
import { useField } from "formik";

export const Switch = ({ name, ...props }: Props) => {
  const [field] = useField({ name });

  return (
    <HUISwitch
      checked={field.value}
      onChange={(value: boolean) => {
        field.onChange({ target: { value, name } });
      }}
      className={`${field.value ? "bg-cuarty" : "bg-secondary"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${field.value ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
      <Field name={name} {...props} type="hidden" />
    </HUISwitch>
  );
};

export default Switch;
