import { useState } from 'react';
import { v4 as getUuid } from 'uuid';

interface Props {
  initialValue: string;
}
export function useChangeInitialValue({ initialValue: _initialValue }: Props) {
  const [initialValue, setInitialValue] = useState(_initialValue);
  const [key, setKey] = useState<string>(getUuid());

  const onChangeInitialValue = (value: string) => {
    setInitialValue(value);
    setKey(getUuid());
  };

  return {
    initialValue,
    onChangeInitialValue,
    key,
  };
}
