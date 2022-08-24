import Form from "components/forms/Form";
import Select from "components/forms/Select";
import { FormikValues } from "formik";
import useTranslate from "hooks/useTranslate";
import { useCallback } from "react";
import userStore from "stores/UserStore";

export default function LanguageSelect() {
  const language = userStore((state: any) => state.lang);
  const setLanguage = userStore((state: any) => state.setLang);
  const t = useTranslate();

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

  return (
    <Form initialValues={initVal} onSubmit={handleChange} autoSubmit>
      <Select choices={langs} name="lang" placeholder={t("change language")} />
    </Form>
  );
}
