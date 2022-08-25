import { ColorScheme } from './constants';

export const parseJwt = (token: string) => {
  if (!token) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const getColorSchemeOrDefault = () => {
  const colorScheme = localStorage.getItem('colorScheme');
  if (!colorScheme) return ColorScheme.Light;
  if (Object.values(ColorScheme).includes(colorScheme as ColorScheme))
    return colorScheme as ColorScheme;
  return ColorScheme.Light;
};
