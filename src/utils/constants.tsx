export const auth_jwtName = `jwt${import.meta.env.VITE_JWT_COOKIE_SUFFIX}`;

export enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

export const supportedLanguages = [
  { code: 'ro-RO', name: 'Romanian' },
  { code: 'en-US', name: 'English' },
];

export const longCacheTime = 6 * 60 * 60 * 1000; // 6 hours
