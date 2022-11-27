import { ActionIcon } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons';
import { useMemo } from 'react';
import { ColorScheme } from '../../utils/constants';
import { useColorScheme } from './hooks/useColorScheme';

const ColorSchemeToggler = () => {
  const { colorScheme, toggle } = useColorScheme();

  const icon = useMemo(
    () => (colorScheme === ColorScheme.Light ? <IconMoon /> : <IconSun />),
    [colorScheme]
  );

  return (
    <ActionIcon variant='outline' size='lg' onClick={toggle}>
      {icon}
    </ActionIcon>
  );
};

export default ColorSchemeToggler;
