import { useMemo } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';
import { ColorScheme } from '../../utils/constants';
import { useColorScheme } from './hooks/useColorScheme';

const ColorSchemeToggler = () => {
  const { colorScheme, toggle } = useColorScheme();

  const icon = useMemo(
    () => (colorScheme === ColorScheme.Light ? <IconMoon /> : <IconSun />),
    [colorScheme]
  );

  return (
    <ActionIcon variant='light' size='lg' onClick={toggle}>
      {icon}
    </ActionIcon>
  );
};

export default ColorSchemeToggler;
