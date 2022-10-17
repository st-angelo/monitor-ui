import { TextInput, TextInputProps } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { useMemo, } from 'react';

interface ClearableTextInputProps {
  onChange: (value: string) => void;
}

const ClearableTextInput = ({
  value,
  onChange,
  ...rest
}: ClearableTextInputProps &
  Omit<TextInputProps, "onChange"> &
  React.RefAttributes<HTMLInputElement>) => {
  const showClearIcon = useMemo(() => Boolean(value), [value]);

  return (
    <>
      <TextInput
        value={value}
        onChange={ev => onChange(ev.target.value)}
        rightSection={
          showClearIcon && (
            <IconX
              className='cursor-pointer'
              size={14}
              onClick={() => onChange('')}
            />
          )
        }
        {...rest}
      />
    </>
  );
};

export default ClearableTextInput;
