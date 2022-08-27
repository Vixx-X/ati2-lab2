import { useFormikContext } from "formik";
import { useEffect } from "react";

export const AutoSubmit = () => {
  const { dirty, submitForm } = useFormikContext();
  useEffect(() => {
    if (dirty) {
      submitForm();
    }
  }, [dirty, submitForm]);
  return null;
};

export default AutoSubmit;
