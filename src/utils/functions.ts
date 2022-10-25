import { Updater } from 'react-use-svelte-store';
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

export const setNestedProperty = (target: any, path: string, value: any) => {
  if (!path || !target) {
    console.error("[setNestedProperty] invalid 'path' or 'target'");
    return;
  }
  const segments = path.split('.');
  const property = segments.pop();
  if (!property) {
    console.error("[setNestedProperty] invalid 'property'");
    return;
  }
  let _target = target;
  segments.forEach(segment => (_target = target[segment]));
  _target[property] = value;
};

export const formatNumberWithCommas = (value: string | undefined) =>
  value ? value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '';
