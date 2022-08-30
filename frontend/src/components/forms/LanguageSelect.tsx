import Form from "components/forms/Form";
import Select from "components/forms/Select";
import { FormikValues } from "formik";
import useTranslate from "hooks/useTranslate";
import { useCallback } from "react";
import userStore from "stores/UserStore";

export default function LanguageSelect() {
  const language = userStore((state: any) => state.lang);
  const setLanguage = userStore((state: any) => state.setLang);

  const handleChange = useCallback(
    (values: FormikValues) => {
      setLanguage(values.lang);
    },
    [setLanguage]
  );

  const initVal = {
    lang: language,
  };

  const langs = [
    {
      value: "es",
      text: "Español",
    },
    {
      value: "en",
      text: "English",
    },
  ];

  const styles = {
    alignItems: "center",
    '& .MuiSelect-select': {
      backgroundColor: "white",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
    }
  }


  return (
    <Form initialValues={initVal} onSubmit={handleChange} autoSubmit>
      <Select choices={langs} name="lang" noPlaceholder sx={styles} />
    </Form>
  );
}
