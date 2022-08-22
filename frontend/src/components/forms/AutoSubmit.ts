import { useEffect } from 'react';

import { useFormikContext } from 'formik';

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
