import i18next from 'i18next';
import { Category } from '../../models/common';

export const getTranslatedCategory = (category?: Category) => {
  if (!category) return '';
  return category.code ? i18next.t(`Value.${category.code}`) : category.name;
};
