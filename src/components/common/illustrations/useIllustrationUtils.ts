import { useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';

const useIllustrationUtils = () => {
  const theme = useMantineTheme();

  const grayColor = useMemo(
    () => (theme.colorScheme === 'light' ? '#E1E4E5' : '#45464b'),
    [theme]
  );

  const themeColor = useMemo(
    () => theme.colors[theme.primaryColor][7],
    [theme]
  );

  return { theme, grayColor, themeColor };
};

export default useIllustrationUtils;
