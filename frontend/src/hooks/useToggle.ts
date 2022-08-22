import { useState } from 'react';

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggleValue = (value: any) => {
    setValue((currentValue) =>
      // is checking value to toggle on undefined and cast non boolean
      typeof value === 'boolean' ? value : !currentValue
    );
  };

  return [value, toggleValue] as const;
}
