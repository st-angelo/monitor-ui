import { NumberInput, NumberInputProps } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

interface DebouncedNumberInputProps {
  delay?: number;
}

const DebouncedNumberInput = ({
  delay = 400,
  value,
  onChange = () => {},
  ...rest
}: DebouncedNumberInputProps &
  NumberInputProps &
  React.RefAttributes<HTMLInputElement>) => {
  const [internalValue, setInternalValue] = useState(value);
  const debounced = useRef(debounce(newValue => onChange(newValue), delay));

  useEffect(() => setInternalValue(value), [value]);

  const handleUpdate = useCallback((newValue: number) => {
    setInternalValue(newValue);
    debounced.current(newValue);
  }, []);

  return (
    <>
      <NumberInput value={internalValue} onChange={handleUpdate} {...rest} />
    </>
  );
};

export default DebouncedNumberInput;
