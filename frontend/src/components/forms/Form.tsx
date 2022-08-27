import AutoSubmit from "./AutoSubmit";
import { Form as FForm, Formik, FormikConfig, FormikValues } from "formik";

interface FormProps extends FormikConfig<FormikValues> {
  autoSubmit?: boolean;
}

export const Form = ({
  children,
  initialValues,
  onSubmit,
  autoSubmit,
  ...props
}: FormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      {...props}
    >
      <FForm>
        <>
          {children}
          {autoSubmit && <AutoSubmit />}
        </>
      </FForm>
    </Formik>
  );
};

export default Form;
