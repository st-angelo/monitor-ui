import { TextInput, TextInputProps } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

interface DebouncedTextInputProps {
  delay?: number;
}

const DebouncedTextInput = ({
  delay = 250,
  value,
  onChange = () => {},
  ...rest
}: DebouncedTextInputProps &
  TextInputProps &
  React.RefAttributes<HTMLInputElement>) => {
  const [internalValue, setInternalValue] = useState(value);
  const debounced = useRef(debounce(newValue => onChange(newValue), delay));

  useEffect(() => setInternalValue(value), [value]);

  const handleUpdate = useCallback(
    ({ target: { value: newValue } }: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(newValue);
      debounced.current(newValue);
    },
    []
  );

  return (
    <>
      <TextInput value={internalValue} onChange={handleUpdate} {...rest} />
    </>
  );
};

export default DebouncedTextInput;
