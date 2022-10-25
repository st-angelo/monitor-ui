import { useCallback, useEffect, useState } from 'react';
import { ColorScheme } from '../../../utils/constants';
import { getColorSchemeOrDefault } from '../../../utils/functions';

export const useColorScheme = () => {
  const [value, setValue] = useState<ColorScheme>(ColorScheme.Light);

  useEffect(() => {
    const setSchemeFromLocalStorage = () => setValue(getColorSchemeOrDefault());

    setSchemeFromLocalStorage();
    window.addEventListener('colorscheme', setSchemeFromLocalStorage);

    return () =>
      window.removeEventListener('colorscheme', setSchemeFromLocalStorage);
  }, []);

  const toggle = useCallback(() => {
    setValue(prev => {
      let newScheme: ColorScheme;
      if (prev === ColorScheme.Light) newScheme = ColorScheme.Dark;
      else newScheme = ColorScheme.Light;

      localStorage.setItem('colorScheme', newScheme);
      window.dispatchEvent(new Event('colorscheme'));

      return newScheme;
    });
  }, []);

  return { colorScheme: value, toggle };
};
