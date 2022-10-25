import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

// Cache dictionary values for 6 hours
const dictionaryCacheTime = 6 * 60 * 60 * 1000;

const defaultOptions = {
  valueField: 'id',
  labelField: 'code',
  fallbackLabelField: 'name',
};

interface TranslationOptions {
  valueField: string;
  labelField: string;
  fallbackLabelField: string;
}

export const useDictionary = <T extends Record<string, any>>(
  key: any,
  getter: () => Promise<T[]>
) => {
  const { data } = useQuery(key, getter, {
    cacheTime: dictionaryCacheTime,
    staleTime: dictionaryCacheTime,
  });

  return data || [];
};

export const useDictionaryWithTranslation = <T extends Record<string, any>>(
  key: any,
  getter: () => Promise<T[]>,
  options?: Partial<TranslationOptions>
) => {
  const { t, i18n } = useTranslation();
  const data = useDictionary(key, getter);

  const _options = useMemo(
    () => ({ ...defaultOptions, ...(options || {}) }),
    [options]
  );

  return data.map(item => ({
    value: item[_options.valueField],
    label: !i18n.exists(`Value.${item[_options.labelField]}`)
      ? item[_options.fallbackLabelField]
      : t(`Value.${item[_options.labelField]}`),
  }));
};
